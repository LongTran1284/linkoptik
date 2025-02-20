import { Component, ComponentFactoryResolver, HostListener, Input, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { LgIcon, LgModal, LgModalService } from 'lg-components';

import { EventService } from '../../services/event.service';
import { CustomerService } from '../../services/customer.service'; 
import { CustomerClass } from '../../shared/customer-interface';
import { UserInterface } from '../../shared/user-interface';
import { BottomComponent } from '../bottom.component';
// import { ResultItemComponent } from '../../components/result-item.component';
// import { CustomerFormComponent } from '../../components/form-customer.component';
import { SearchComponent } from '../search.component';
// import { HeaderComponent } from '../../components/header.component';
// import { AdminDashboardComponent } from '../../components/admin-dashboard.component';
import { CustomerItemComponent } from './customer-item.component';
import { CustomerDetailComponent } from '../details/customer-detail.component';
import { DataService } from '../../services/data.service';
import { CustomerFormComponent } from '../forms/customer-form.component';

@Component({
  selector: 'customer-list',
  standalone: true,
  imports: [
    CommonModule, HttpClientModule,
    LgIcon, LgModal,
    CustomerItemComponent, CustomerFormComponent, BottomComponent, SearchComponent,
    CustomerDetailComponent
  ],
  providers: [CustomerService],
  template: `
  
  <h1 class="text-center text-blue-500 text-lg sm:text-xl md:text-2xl font-bold my-5">LINKOPTIK CUSTOMER LIST</h1>
  
  <div class="mx-5 mb-5 flex justify-center ">
    <div class=" w-full md:w-9/12 ">
      <search (search_event)="onSearch($event)"></search>
    </div>    
  </div>
    
  <div *ngFor="let item of filter_cus; index as j" class="mx-5">
    <div (click)="itemClick(item, j)">
      <customer-item [data]="item" [stt]="j+1" ></customer-item>
    </div>    
  </div>

  <div >
    <lg-modal id="detailForm" [static]="true" 
    [style]="{'width': screen_width < 700 ? '100%' : (screen_width < 1000 ? '60%' :'50%')}" >
      <customer-detail (edit_customer)="editCustomer($event)" (closeAfterDelete)="closeAfterDelete($event)"></customer-detail>
    </lg-modal>
  </div>
  <app-bottom></app-bottom>
  
  `,
  styles: ``
})
export class CustomerListComponent {
  
  all_cus: any = []
  cus: any = []
  filter_cus: any = []  

  screen_width: number = 0
  
  constructor(
    private modalService: LgModalService, 
    private eventService: EventService,    
  ){  
    
    this.eventService.listen('userCustomerList', (data: any) => {
      this.all_cus = data.all_cus
      this.filter_cus = this.cus = data.cus
    })

    this.eventService.listen('screenWidth', width => this.screen_width = width)    
  }

  ngOnInit(){
    if (this.screen_width === 0) this.screen_width = window.screen.availWidth
  }

  
  openForm(key: string){
    this.modalService.open(key) 
    const lastData = [...this.all_cus].sort((a, b) => parseInt(b.id) - parseInt(a.id))  // bring the last id to the first place
    this.eventService.emitt('add', parseInt(lastData[0]['id']))
  }

  onSearch(value: string){
    const [search, searchBy] = value     
    const filters: any = {
      'showAll': (item: CustomerClass) => item,
      'byName': (item: CustomerClass) => item.companyName.toLowerCase().includes(search),
      'byApplication': (item: CustomerClass) => item.application.toLowerCase().includes(search),
      'byModel': (item: CustomerClass) => item.model.toLowerCase().includes(search),
      'byDate': (item: CustomerClass) => item.orderDate.toLowerCase().includes(search),
      'bySeller': (item: CustomerClass) => item.seller.toLowerCase().includes(search)     
    }
    if (searchBy === 'check') this.checkExitedCustomer(search)
    else this.filter_cus = this.cus.filter(filters[searchBy])
  }

  checkExitedCustomer(customer: string){
    if (customer) {
      let exist: boolean = false  
      for (let item of this.all_cus){
        // console.log(item.companyName.toLowerCase(), customer)
        if (item.companyName.toLowerCase().includes(customer)){
          exist = true
          break
        }
      }
      if (exist){
        alert(`The customer "${customer}" has been registered by another user!!`)
      }
      else {
        alert(`Congratulations! This customer "${customer}" is available for register!`) 
      }
    }
    
  }
  
  itemClick(item: any, id: number){    
    this.eventService.emitt('customerDetail', {data: item, id: id})
    this.modalService.open('detailForm')
  }

  editCustomer(event: any){
    this.cus[event.id] = event.newValue
    this.filter_cus[event.id] = event.newValue
  }

  closeAfterDelete(event: any){
    const index = this.all_cus.indexOf(event.data, 0);
    if (index > -1) this.all_cus.splice(index, 1)
    
    this.cus.splice(event.id, 1)
    this.modalService.close('detailForm')
  }
}
