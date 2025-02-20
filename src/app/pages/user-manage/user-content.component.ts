import { Component, HostListener } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LgIcon, LgModal, LgModalService, TooltipDirective } from 'lg-components';

import { RegisterService } from '../../services/register.service';
import { UserService } from '../../services/user.service';
import { CustomerService } from '../../services/customer.service';
import { EventService } from '../../services/event.service';

import { CustomerClass } from '../../shared/customer-interface';
import { UserInterface } from '../../shared/user-interface';
import { CustomerFormComponent } from '../../components/forms/customer-form.component';
import { UserDetailComponent } from '../../components/details/user-detail.component';


@Component({
  selector: 'user-content',
  standalone: true,
  providers: [UserService, CustomerService],
  imports: [
    LgIcon, TooltipDirective, LgModal,
    RouterModule, HttpClientModule,
    CustomerFormComponent, UserDetailComponent
  ],
  template: `
    <div class="w-full flex justify-between items-center text-xs md:text-base px-4 ">
      <div class="cursor-pointer flex items-center text-blue-500 md:text-slate-700 hover:text-blue-500" 
      (click)="openCustomerForm()">
        <lg-icon name="plus"></lg-icon>&nbsp; {{addLabel}}
      </div> 

      @if(role === 'admin'){
        <button class="w-24 px-3 py-1 rounded-lg bg-blue-500 text-white mr-2 disabled:opacity-50" 
          [disabled]="disableBtn['userlist']" (click)="changeUrl('userlist')">User</button>
        <button class="w-24 px-3 py-1 rounded-lg bg-red-500 text-white ml-2 disabled:opacity-50" 
          [disabled]="disableBtn['customer']" (click)="changeUrl('customer')">Customer</button>
      }
            
      <div class="flex cursor-pointer items-center">
        @if(role === 'user'){
          <span [lgToolTip]="{parent: user, text: 'Edit'}" (click)="openUserDetailForm()" #user>Welcome {{nickName}}</span>
          <span class="text-red-700 pl-4 pr-2" (click)="registerService.logout()">
          <lg-icon tooltip="Sign out" name="power-off"></lg-icon></span>
        } 
        @else {
          <div class="flex cursor-pointer items-center justify-end "  #user id="signout"
            [lgToolTip]="{parent: user, text: 'Sign out'}" (click)="registerService.logout()">
            <span >Welcome {{nickName}}</span>
            <span class="text-red-700 p-2" ><lg-icon name="power-off"></lg-icon></span>
          </div>   
        }        
      </div>     

    </div>

    <router-outlet></router-outlet>

    <div>
      <lg-modal id="addForm" title="ADD NEW CUSTOMER" [titleStyle]="{'color':'rgb(59 130 246)'}">
        <customer-form purpose="add" (update_data)="addCustomerList($event)"></customer-form>
      </lg-modal>

      <lg-modal id="userDetail" [static]="true" [style]="{'width': screen_width < 700 ? '100%' :'400px', 'overflow':'hidden'}"
        title="User Details" [titleStyle]="{'color':'rgb(59 130 246)'}"
      >
        <user-detail (edit_user)="editUser($event)"></user-detail>
      </lg-modal>
    </div>
  `,
  styles: ``
})
export class UserContentComponent {
  
  role: string = ''
  nickName: string = ''
  screen_width: number = 0
  data: CustomerClass[] = []
  all_data: CustomerClass[] = []
  user!: UserInterface      // user data in userList
  userListID: number = 0    // id in userList for UserDetailComponent
  all_user: UserInterface[] = []

  disableBtn: any = {userlist: false, customer: false}
  
  get addLabel(){
    return this.screen_width < 700 ? 'New' : 'New Customer'
  }

  @HostListener('window:resize', ['$event']) onResize(){
    this.screen_width = window.screen.availWidth
    this.eventService.emitt('screenWidth', this.screen_width)
    // console.log(this.screen_width)
  }

  constructor(
    public registerService: RegisterService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private customerService: CustomerService, 
    private eventService: EventService, 
    private modalService: LgModalService,
    private router: Router
  ){
    this.role = this.activeRoute.snapshot.data['role']    
    // this.handle_role(this.role)
    this.changeUrl('customer')    
  } 

  handle_role(role: string){
    /* role === user: filter customer list base on user
      role === admin: show all customer and user list
      role === guest, linkoptik: show all customer
    */ 
    const urlID = this.activeRoute.snapshot.params['id']
    this.userService.getUserList().subscribe((data: UserInterface[]) => {    
      this.all_user = data
      if (role === 'user'){
        for (let i=0; i< data.length; i++){
          if (data[i].id === urlID){
            this.user = data[i]
            this.userListID = i
            break
          }
        }
        this.nickName = this.user.nickName? this.user.nickName : ''
        const user: string = this.nickName.toLowerCase() 
        this.customerService.getCustomerList().subscribe((data: CustomerClass[]) => {     
          this.all_data = data 
          data.forEach((item: CustomerClass) => {
            if (item.seller.toLowerCase() === user) this.data.push(item)
          })  
          this.eventService.emitt('userCustomerList', {cus: this.data, all_cus: this.all_data})
        })
      }
      else {
        this.nickName = this.capitalizeFirstLetter(role)
        this.customerService.getCustomerList().subscribe((data: CustomerClass[]) => {     
          this.all_data = this.data = data 
          this.eventService.emitt('userCustomerList', {cus: this.data, all_cus: this.all_data})
        })
        if (role === 'admin') this.eventService.emitt('userList', {all_cus: this.all_data, all_user: data})
      }      
    })   
  }

  _getData(){
    const urlID = this.activeRoute.snapshot.params['id']
    this.userService.getUserList().subscribe((data: UserInterface[]) => {    
      this.all_user = data
      for (let i=0; i< data.length; i++){
        if (data[i].id === urlID){
          this.user = data[i]
          this.userListID = i
          break
        }
      }
      this.nickName = this.user.nickName? this.user.nickName : ''
      const user: string = this.nickName.toLowerCase() 
      this.customerService.getCustomerList().subscribe((data: CustomerClass[]) => {     
        this.all_data = data 
        data.forEach((item: CustomerClass) => {
          if (item.seller.toLowerCase() === user) this.data.push(item)
        })  
        this.eventService.emitt('userCustomerList', {cus: this.data, all_cus: this.all_data})
      })
    })   
  }

  _getAllData(){
    this.nickName = this.capitalizeFirstLetter(this.role)
    this.customerService.getCustomerList().subscribe((data: CustomerClass[]) => {     
      this.all_data = this.data = data 
      this.eventService.emitt('userCustomerList', {cus: this.data, all_cus: this.all_data})
    })

    this.userService.getUserList().subscribe((data: UserInterface[]) => {    
      this.all_user = data
      this.eventService.emitt('userList', {all_cus: this.all_data, all_user: data})
    })
  }

  capitalizeFirstLetter(str: string): string {
    return [...str][0].toUpperCase() + str.slice(1);
  }

  changeUrl(key: string){
    // this function for Admin account only
    // this.handle_role(this.role)
    
    const url = this.router.url
    const urls: string[] = url.split('/')
    // console.log(urls)

    if (this.role === 'user') {
      this._getData(); 
      if (!url.includes('customer')) {this.router.navigate([url, 'customer'])}
    }
    // play Guest as Admin for testing
    // else if (this.role === 'guest') {
    else {
      this._getAllData()
      if (urls.length > 2) {
        this.disableBtn[key] = true
        this.disableBtn[urls[2]] = false
        if (urls[2] !== key) {this.router.navigate([url.replace(urls[2], key)])}
        else this.disableBtn[key] = true
      } 
      else {
        this.disableBtn[key] = true
        this.router.navigate([url, key])
      } 
    }       
  }

  ngOnInit(){
    this.onResize()    
  }

 
  addCustomerList(data: any){    
    const [new_value, action] = data
    if (action === 'add') {this.data.push(new_value)}    
  }

  openCustomerForm(){
    this.modalService.open('addForm') 
    const lastData = [...this.all_data].sort((a, b) => parseInt(b.id) - parseInt(a.id))  // bring the last id to the first place
    this.eventService.emitt('add', {maxID: parseInt(lastData[0]['id']), seller: this.user.nickName})
  }

  openUserDetailForm(){        
    this.eventService.emitt('userDetail', {
        cus: this.data, all_cus: this.all_data, 
        user: this.user, id: this.userListID, all_user: this.all_user})
    this.modalService.open('userDetail')    
  }


  editUser(event: any){    
    this.user = event.user
    if (event.userNickNameChange){
      this.nickName = event.userNickNameChange
      this.all_data = event.all_cus
      this.data = event.cus        
    }
  }
}
