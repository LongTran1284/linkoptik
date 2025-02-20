import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router, RouterModule } from '@angular/router';
import { CustomerDetail } from '../../shared/customer-interface';
import { CommonModule, Location } from '@angular/common';
import { LgIcon, LgModal, LgModalService } from 'lg-components';
import { CustomerFormComponent } from '../forms/customer-form.component';
import { CustomerService } from '../../services/customer.service';
import { HttpClientModule } from '@angular/common/http';

interface detailItem {
  label: string, content: string
}

@Component({
  selector: 'customer-detail',
  standalone: true,
  imports: [CommonModule, LgIcon, LgModal, CustomerFormComponent, HttpClientModule, RouterModule],
  providers: [CustomerService],
  template: `
  <!-- <div class="flex items-center"> -->
    <div class="text-blue-500 text-lg font-bold text-center mb-5 md:relative">Customer Details
      <div class="md:absolute md:top-0 md:left-2 float-left grid grid-cols-2 gap-4 ">
        <div class="cursor-pointer text-slate-400 hover:text-blue-500" (click)="openForm('editForm')">
          <lg-icon name="pencil" tooltip="Edit"></lg-icon></div>
        <div class="cursor-pointer text-slate-400 hover:text-red-500" (click)="deleteCustomer()">
          <lg-icon name="trash-can" tooltip="Delete"></lg-icon></div>
      </div>        
    </div>
  <div class="w-full  flex justify-center">
    <div >
    <div *ngFor="let dt of details" class="text-sm md:text-base">        
      @if ( dt.label ==='subdealer') {
        <div class="mb-2">            
          <span class="italic font-bold text-teal-500">{{ dt.content }}</span>        
        </div>          
      }
      @else {
        <div class="grid grid-cols-[110px_auto] md:grid-cols-[130px_auto] gap-4 mb-2">
          <span class="flex justify-between" >{{ dt.label }} <span>:</span></span>
          <div class="flex" [ngClass]="{
            'text-lime-500' : dt.content.toLowerCase()==='success', 
            'text-red-500'  : dt.content.toLowerCase()==='fail', 
            'text-blue-500' : dt.content.toLowerCase()==='pending'}"
          >
            <span >{{ dt.content }}</span>
            <div *ngIf="dt.content.toLowerCase() === 'success'" class="ml-3" ><lg-icon name="check"></lg-icon></div>
            <div *ngIf="dt.content.toLowerCase() === 'fail'" class="ml-3" ><lg-icon name="xmark"></lg-icon></div>
            <div *ngIf="dt.content.toLowerCase() === 'pending'" class="ml-3 animate-spin-slow" >
              <lg-icon name="spinner"></lg-icon></div>
          </div>             
        </div>
      }        
    </div>
    </div>
  </div>
    <div>
      <lg-modal id="editForm" title="EDIT CUSTOMER" [titleStyle]="{'color':'rgb(132 204 22)'}">
        <customer-form purpose="edit" (update_data)="editCustomerList($event)"></customer-form>
      </lg-modal>
    </div>
  `,
  styles: ``
})
export class CustomerDetailComponent {

  @Output() edit_customer = new EventEmitter()
  @Output() closeAfterDelete = new EventEmitter()

  data: any = {}
  details: detailItem[] = []
  id: number = 0 // index of data list in order to revise the data in CustomerList component

  constructor(
    private modalService: LgModalService, 
    private eventService: EventService,
    private customerService: CustomerService,
  ){        
    this.eventService.listen('customerDetail', (data: any) => {
      // console.log('customerDetail', data)
      this.data = data.data
      this.id = data.id
      this.getDetails()
    })
  }

  ngOnInit(){
    // this.eventService.listen('customerDetail', data => console.log(data))
  }

  
  getDetails(){
    this.details = []
    Object.keys(CustomerDetail).map((key: any, idx: number) => {            
      if (key === 'subdealer'){
        if (this.data[key]) {
          this.details.push({label: key, content: CustomerDetail[key]})
          this.details.push({label: 'Trading Company', content: this.data['tradingName']})
          this.details.push({label: 'Trading Address', content: this.data['tradingAddress']})
        }                
      }
      else if (key === 'status') {
        this.details.push({label: CustomerDetail[key], content: this.data[key]})
        if (this.data[key].toLowerCase() === 'success'){
          this.details.push({label: 'Success Date', content: this.data['successDate']})
        }
        else if (this.data[key].toLowerCase() === 'fail'){
          this.details.push({label: 'Reason (if exits)', content: this.data['failReason']})
        }
      }
      else {        
        let label = CustomerDetail[key]
        let content = this.data[key]
        if (key === 'address') {
          if (this.data['address']) {content = `${this.data['address']}, ${this.data['province']}`}
          else {content = `${this.data['province']}`}
        }
        this.details.push({label: label, content: content})
      }
      
    })
  }

  openForm(key: string){
    this.modalService.open(key)
    this.eventService.emitt('edit', this.data)    
  }


  editCustomerList(data: any){    
    const [new_value, action] = data    
    if (action === 'edit') {
      this.data = new_value; this.getDetails(), 
      this.edit_customer.emit({newValue: new_value, id: this.id})
    }    
  }

  deleteCustomer(){    
    const confirmation = confirm(`Are you sure you want to delete the customer ${this.data['companyName']}?`)
    if (confirmation) {
      this.customerService.deleteCustomer(this.data).subscribe()
      alert(`The customer ${this.data['companyName']} has been deleted!!`)
      this.closeAfterDelete.emit({data: this.data, id: this.id})
    }    
  }

}
