import { Component, ElementRef, EventEmitter, Input, Output, ViewChildren } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LgIcon, LgModal, LgModalService, LgSelectbox, optionItem } from 'lg-components';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
// import { FormPasswordComponent } from '../../components/form-password.component';
import { FormsModule } from '@angular/forms';
import { UserDetail, UserInterface } from '../../shared/user-interface';
import { CustomerService } from '../../services/customer.service';
import { CustomerClass } from '../../shared/customer-interface';
import { companyGroup } from '../../shared/commonValues';
import { PreventKeyDirective } from '../../directives/prevent-key.directive';
import { PasswordFormComponent } from '../forms/password-form.component';

interface detailItem {
  key: string, label: string, content: any
}

@Component({
  selector: 'user-detail',
  standalone: true,
  imports: [
    CommonModule, HttpClientModule, RouterModule, FormsModule,
    LgIcon, LgModal,
    // FormPasswordComponent,
    PasswordFormComponent,
    PreventKeyDirective
  ],
  providers: [UserService, CustomerService],
  template: `
    
    <!-- <div class="text-blue-500 text-lg font-bold text-center mb-5">User Details</div> -->

    <div *ngFor="let dt of details; index as j"
    class="grid grid-cols-[75px_calc(100%-75px-25px)] md:grid-cols-[100px_calc(100%-100px-30px)] 
    text-sm md:text-base gap-2 md:gap-4 mb-2 p-0 mx-0 relative">
      <div class="flex justify-between items-center" >{{dt.label}}<span>:</span></div>
      <div class="">
        @if (dt.label === 'Company') {
          <select [disabled]="roList[j]" [ngClass]="roList[j] ? 'inputDeactive':'inputActive'"
          [(ngModel)]="dt.content" (ngModelChange)="changeCompanyKey($event)"
          >
            <option *ngFor="let com of companies" [ngValue]="com.key">{{com.value}}</option>
          </select>
        }@else {
          <input type="text" [ngClass]="roList[j] ? 'inputDeactive':'inputActive'" 
          [readOnly]="roList[j]" [(ngModel)]="dt.content" #ref [preventKey]="{el: ref, id: j}">
        }
        
        <div class="cursor-pointer absolute right-2 top-1 text-slate-400 hover:text-blue-500" 
          (click)="dt.label === 'Password' ? openForm('changePassword') : pencilClick(j)">
          <lg-icon name="pencil" ></lg-icon>
        </div>                    
      </div>                   
    </div>

    <div class="flex justify-between">
      <button class="btn del" (click)="deleteUser()">Delete</button>
      <button class="btn edit" [disabled]="editDisable" (click)="editUserList()">Edit</button>
    </div>

    <div >
      <lg-modal [style]="{'width':'250px'}" id="changePassword" [static]="true" 
      [title]="{text:'Change Password', big:'20px', small:'18px'}" [titleStyle]="{'color': 'rgb(132 204 22)'}"
        ><password-form (update_data)="changePassword($event)"></password-form>
      </lg-modal>
    </div>
  `,
  styles: ``
})
export class UserDetailComponent {
  @Output() userNickNameChange = new EventEmitter()
  @Output() edit_user = new EventEmitter()
  private user!: any
  roList: boolean[] = []      // readonly list to control the editDisable boolean
  editDisable: boolean = true // enable/disable edit button
  private users: UserInterface[] = [] // to check if edited user is valid
  details: detailItem[] = []
  private customerList: CustomerClass[] = []
  private allCustomer: CustomerClass[] = []
  private userListID!: any

  companies: optionItem[] = companyGroup

  constructor(
    private router: Router, 
    private modalService: LgModalService, 
    private eventService: EventService,
    private userService: UserService,
    private customerService: CustomerService,
  ){       
    this.eventService.listen('userDetail', (data: any) => {      
      this.customerList = data.cus
      this.allCustomer = data.all_cus
      this.user = data.user
      this.users = data.all_user
      this.userListID = data.id
      this._createUtilities()
    })
  }

  _createUtilities(){
    // if (this.details.length || this.roList.length) return
    this.details = []

    Object.keys(UserDetail).map((key: any, idx: number) => {  
      let value:any = {key: key, label: UserDetail[key]}     
      if (key === 'password') value = {...value, content: this.user[key].replace(/./g, '*')}
      else if (key === 'company') {
        let companyKey: string = ''
        for (let com of this.companies){
          if (com.value === this.user[key]){
            companyKey = com.key
            break
          }
        }
        value ={...value, content: companyKey}
      }
      else value = {...value, content: this.user[key]}
      
      this.details.push(value)
      this.roList.push(true)
    })
  }
  openForm(key: string){
    this.modalService.open(key)
    this.eventService.emitt('openPasswordForm', true)
  }

  changePassword(event: any){    
    const newValue = {...this.user, password: event}
    // console.log('change Password:', newValue)
    this.userService.updateUser(newValue).subscribe(data => this.user = data)
    this.details[1].content = event.replace(/./g, '*')
    const confirmation = confirm('The current password has been changed successfully. Close this window??')
    if (confirmation) {this.modalService.close('changePassword')}
  }

  editUserList(){        
    let userName: string = this.details[0].content
    let company: string = this.details[2].content.v
    let nickName: string = this.details[3].content
    const old_nickname = this.user.nickName
    
    if (this.checkValidUser(userName, nickName)){
      const newValue: UserInterface = {...this.user, ...{
        userName: userName, 
        company: company,
        nickName: nickName
      }}
      this.userService.updateUser(newValue).subscribe() // data => this.user = data
      this.user = this.users[this.userListID] = newValue
            
      if (old_nickname !== nickName) {
        localStorage.setItem('nickName', nickName)
        this.reUpdateCustomerList(nickName)
        this.edit_user.emit({user: this.user, all_user: this.users, userNickNameChange: nickName, 
          cus: this.customerList, all_cus: this.allCustomer})
      } else this.edit_user.emit({user: this.user, all_user: this.users, userNickNameChange: ''})

      alert('This user account has been updated successfully!')
    }
    else alert('This user account exists. Please choose another name.')   
  }

  deleteUser(){
    const confirmation = confirm(`Are you sure you want to delete the user account ${this.user['nickName']}?`)
    if (confirmation) {
      this.userService.deleteUser(this.user).subscribe()
      alert(`The user account ${this.user['nickName']} has been deleted!!`)
      this.router.navigate(['login']) 
    }    
  }

  pencilClick(j: number){
    this.roList[j]=!this.roList[j]; 
    let sth: boolean = true
    for (let ro of this.roList){      
      if (!ro){
        sth = false
        break
      }
    }
    this.editDisable = sth    
  }

  checkValidUser(user: string, nickName: string){
    let validUser: boolean = true    
    for (let item of this.users){
      if (item.userName === user && item.nickName === nickName){
        validUser = false;
        break
      }
    }
    return validUser
  }

  reUpdateCustomerList(nickName: string){
    /* While the nickName changed, the customerList should be changed also    */     
    this.customerList.map((item: CustomerClass, id: number) => {
      const index = this.allCustomer.indexOf(item)
      let newValue = {...item, ...{seller: nickName}}
      this.allCustomer[index] = newValue
      this.customerList[id] = newValue
      // console.log(index, newValue)
      this.customerService.updateCustomer(newValue).subscribe()    
    })
  }

  changeCompanyKey(event: any){    
    let currentKey = this.details[3].content.split('-')[1]
    this.details[3].content = this.details[3].content.replace(currentKey, ` ${event.k}`)
  }
  

}
