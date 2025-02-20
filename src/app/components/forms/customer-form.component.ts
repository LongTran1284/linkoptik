import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { LgDate, LgIcon, LgInput, LgModal, LgModalService, LgPassword, LgSelectbox, optionItem } from 'lg-components';
import { CustomerService } from '../../services/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { CustomerClass } from '../../shared/customer-interface';
import { EventService } from '../../services/event.service';
import { UserService } from '../../services/user.service';
import { createDistrictption, ProvinceClass, provinceOption } from '../../shared/provinceData';
import { ModelFormComponent } from './model-form.component';

@Component({
  selector: 'customer-form',
  standalone: true,
  imports: [
    CommonModule, HttpClientModule,
    LgIcon, LgPassword, LgInput, LgDate, LgSelectbox, LgModal,
    FormsModule, ReactiveFormsModule,
    ModelFormComponent
  ],
  providers: [CustomerService, UserService],
  template: `
    <div class="rounded">
      <!-- <div class="flex place-content-between mb-5 ">
        <div class="py-3 mx-auto text-2xl" [ngClass]="{'add_color':purpose==='add','edit_color':purpose==='edit'}"
        >{{title.toUpperCase()}}</div>
        <div class="text-red-500 text-3xl p-0 cursor-pointer" (click)="closeForm()"><lg-icon name="xmark"></lg-icon></div>
      </div> -->
      
      <form [formGroup]="customerForm" class="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div class="col-span-2  md:col-span-3">
          <lg-input label="Company Name" controlKey="companyName"></lg-input>
        </div>        
        <div class="col-span-2  md:col-span-3">
          <lg-input label="Address" controlKey="address"></lg-input>
        </div>
        <!-- <div class=" col-span-2 md:col-span-1">
          <lg-input label="Province" controlKey="province"></lg-input>
        </div>           -->
        <div class=" col-span-2 md:col-span-1">
          <lg-selectbox label="Province/City" [options]="provinceOption" controlKey="province"></lg-selectbox>
        </div> 
        <div class=" col-span-2 md:col-span-1">
          <lg-selectbox label="District/City" [options]="districtOption" controlKey="district"></lg-selectbox>
        </div> 
        <div class=" col-span-2 md:col-span-1">
          <lg-selectbox label="Ward/Commune" [options]="provinceOption" controlKey="ward"></lg-selectbox>
        </div>  
        <div class="col-span-2">
          <lg-input label="Application" controlKey="application"></lg-input>
        </div>
        <div class="col-span-2 row-start-6 md:row-start-5 " (click)="openForm('modelForm')">
          <lg-input label="Model" controlKey="model"></lg-input>
        </div>
       
        <div class="col-span-2 md:col-span-1">
          <lg-date label="Order Date" controlKey="orderDate"></lg-date>
        </div>
       
        <div class="col-span-2 md:col-span-1">
          <lg-selectbox [options]="userOption" [arrow]="!sellerReadonly" [readonly]="sellerReadonly"
            label="Relative Sales" controlKey="seller"></lg-selectbox>
        </div>       

        <div class="  mt-2 flex justify-start items-center col-span-2 md:col-span-3">
          <label for="sub" class="mr-2 text-sm md:text-base cursor-pointer">Cooperate with other trading company</label>
          <input id="sub" type="checkbox" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 cursor-pointer" formControlName="subdealer"
          >
        </div>

        <div class=" col-span-2 md:col-span-3 md:" [ngStyle]="{'display': subDealer ? 'block' : 'none'}">
          <lg-input label="Trading Company" controlKey="tradingName"></lg-input>
        </div>        
        <div class=" col-span-2 md:col-span-3 md:" [ngStyle]="{'display': subDealer ? 'block' : 'none'}">
          <lg-input label="Address" controlKey="tradingAddress"></lg-input>
        </div>

        <div class=" " [ngStyle]="{'display': purpose === 'edit' ? 'block' : 'none'}">       
          <lg-selectbox [options]="statusOption" label="Status" controlKey="status"></lg-selectbox>
        </div>

        <div class="  " [ngStyle]="{'display': status === 'success' ? 'block' : 'none'}">
           <lg-date label="Success Date" controlKey="successDate"></lg-date>
        </div>

        <div class=" col-span-2 " [ngStyle]="{'display': status === 'fail' ? 'block' : 'none'}">
          <lg-input label="Reason (if exits)" controlKey="failReason"></lg-input>
        </div>

        <div class=" justify-self-center self-center col-start-2 md:col-start-3" >
          <button type="button" class="btn" [ngClass]="{'submit':purpose==='add', 'edit':purpose==='edit'}"
            (click)="addOrEdit()"
          >{{capitalizeFirstLetter(purpose)}}</button>
        </div>
      </form>
    </div>

    <div>
      <lg-modal id="modelForm" [style]="{'width': '200px'}">
        <model-form (apply_model)="applyModel($event)"></model-form>
      </lg-modal>
    </div>
  `,
  styles: ``
})
export class CustomerFormComponent {
  @Output() close_form = new EventEmitter()
  @Output() update_data = new EventEmitter()

  @Input() purpose: string = 'add'
  @Input() editValue: string[] = []

  sellerReadonly: boolean = false
  
  // get title(){
  //   const data: any = {
  //     add: 'Add new customer',
  //     edit: 'Edit customer'      
  //   }
    
  //   try {return data[this.purpose.toLowerCase()]}
  //   catch {return ''}
  // }
  customerForm = new FormGroup({
    status: new FormControl('Pending'),
    model: new FormControl(''),
    // province: new FormControl(new ProvinceClass()),
    subdealer: new FormControl(false),
    seller: new FormControl(''),
    orderDate: new FormControl(''),
    default_orderDate: new FormControl(''),
    successDate: new FormControl(''),
    default_successDate: new FormControl('')
  })
  originalValue!: CustomerClass
  max_index: number = 0

  get status(){return this.customerForm.get('status')?.value?.toLowerCase()}

  get subDealer(){return this.customerForm.get('subdealer')?.value}

  get keys(){
    let result: string[] = []    
    const foo = new CustomerClass();
    const bar = { ...foo }; 
    Object.keys(bar).forEach(key => {if (key !== 'id'){result.push(key)}})
    
    return result
  }

  districtOption: optionItem[] =[]

  // get districtOption(){
  //   const province: string = this.customerForm.get('province')?.value || ''
  //   return createDistrictption(province)
  // }

  statusOption: optionItem[] = [
    {key: "Pending", value: 'Pending'},
    {key: "Success", value: 'Success'},
    {key: "Fail", value: 'Fail'}            
  ]

  userOption: optionItem[] = []
  userList: string[] = []
  provinceOption: optionItem[] = provinceOption

  constructor(
    private customerSerice: CustomerService, 
    private eventService: EventService,
    private userService: UserService,
    private modalService: LgModalService
  ){
    this.userService.getUserList().subscribe(data => {
      data.forEach(item => {
        if (item.nickName){
          const name: string = item.nickName || ''
          this.userOption.push({key: name, value: name})
          this.userList.push(name)
        }        
      })
    })
  }

  ngOnInit(){
    // console.log(this.provinceOption)
    if (this.purpose === 'edit'){      
      this.eventService.listen('edit', data => {
        this.originalValue = data        
        this.keys.forEach(key => {          
          // console.log(key, data[key])
          if (key === 'orderDate' || key === 'successDate' && data[key]) {
            const [d, m, y] = data[key].split('/')
            this.customerForm.get(`default_${key}`)?.setValue(`${y}-${m}-${d}`)              
          }     
          // else if (key === 'province') {this.customerForm.get(key)?.setValue({area: 'South', val: 'Ho Chi Minh City'})}
          else if (key === 'seller' && this.userList.includes(data[key])) {
            this.customerForm.get('seller')?.setValue(data[key])
            this.sellerReadonly = true
          }     
          else this.customerForm.get(key)?.setValue(data[key])

          // if (this.userList.includes(this.seller)){ // avoid Admin, Linkopitk and Guest users
          //   this.customerForm.get('seller')?.setValue(this.seller)
          //   this.sellerReadonly = true
          // } 
        })         
      })
    }
    else if (this.purpose === 'add') {            
      this.eventService.listen('add', (data: any) => {
        this.max_index = data.maxID
        const today: string = (new Date()).toISOString().substring(0,10)
        this.customerForm.get('default_orderDate')?.setValue(today)       
        if (this.userList.includes(data.seller)){
          this.customerForm.get('seller')?.setValue(data.seller)
          this.sellerReadonly = true
        } 
      })
    }        
  }

  capitalizeFirstLetter(str: string): string {
    return [...str][0].toUpperCase() + str.slice(1);
  }

  openForm(key: string){
    this.modalService.open(key)    
    this.eventService.emitt('openModelForm', true)
  }

  applyModel(event: any){
    this.customerForm.get('model')?.setValue(event)
    this.modalService.close('modelForm')
  }

  addOrEdit(){    
    let newValue: any = {}
    const status: string = this.customerForm.get('status')?.value?.toLowerCase() || ''
    this.keys.forEach(key => {
      if (key === 'successDate' && status !== 'success') {
        this.customerForm.get('default_successDate')?.setValue('')
      }
      newValue = {...newValue, [key]: this.customerForm.get(key)?.value}
    })

    // console.log(newValue)
    // return

    if (this.purpose === 'edit'){
      newValue = {id: this.originalValue['id'], ...newValue}      
      this.customerSerice.updateCustomer(newValue).subscribe(data => {
        this.update_data.emit([data, 'edit'])
        alert(`The customer ${newValue['companyName']} has been updated!!`)
      })
    }
    else if (this.purpose === 'add'){
      newValue = {id: (this.max_index+1).toString(), ...newValue}
      this.customerSerice.addCustomer(newValue).subscribe(data => {
        this.update_data.emit([data, 'add'])
        alert(`New customer ${newValue['companyName']} has been added!!`)
      })
    }
    
  }

}

