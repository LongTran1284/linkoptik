import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LgIcon, LgInput, LgPassword, LgSelectbox, optionItem } from 'lg-components';

import { UserInterface } from '../../shared/user-interface';
import { companyGroup, genderGroup } from '../../shared/commonValues';
import { CompanyClass } from '../../shared/company-interface';
import { EventService } from '../../services/event.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'create-account',
  standalone: true,
  imports: [
    CommonModule, HttpClientModule,
    LgIcon, LgPassword, LgSelectbox, LgInput,  
    FormsModule, ReactiveFormsModule, RouterModule,
  ],
  providers: [UserService],
  template: `
  <div class="flex items-center justify-center p-0">
    <div class="w-full rounded shadow-lg p-2 "
      [ngClass]="{'md:w-3/4 xl:w-1/2 md:p-10': !openByModal}"
    >
      <div class="flex place-content-between mb-5 ">
        <div class="py-3 mx-auto text-2xl add_color">CREATE ACCOUNT</div>        
      </div>
      
      <form [formGroup]="userForm" class="grid grid-cols-3 md:grid-cols-6 gap-2">
        <div class="mb-5 row-start-1 col-span-3 md:col-start-1 md:row-start-1 md:col-span-3">
          <lg-input label="User Name" [required]="true" controlKey="userName" (on_change)="createNickName()"></lg-input>
        </div>        
        
        <div class="mb-5 row-start-2 col-span-2 md:col-start-4 md:row-start-1 md:col-span-2" >          
          <lg-selectbox label="Company" [required]="true" controlKey="company" 
            [options]="companies" (on_change)="createNickName()" (send_value)="selectedCompany=$event"
          ></lg-selectbox>
        </div>   
        
        <div class="mb-5 row-start-2 md:col-start-6 md:row-start-1 " >          
          <lg-selectbox label="Gender" [required]="true" controlKey="gender"
            [options]="genders" (on_change)="createNickName()"
          ></lg-selectbox>
        </div>   

        <div class=" mb-5 row-start-3 col-span-3 md:col-start-1 md:row-start-2 md:col-span-3">
          <lg-password id="1" label="Password" [required]="true" [checkStrength]="true" controlKey="password"
            (view_score)="passwordScore=$event"
          ></lg-password>
        </div>
        <div class=" mb-5 row-start-4 col-span-3 md:col-start-4 md:row-start-2 md:col-span-3" >
          <lg-password id="2" label="Confirm Password" [required]="true" controlKey="passwordConfirm"></lg-password>
        </div>
       
        <div class=" mb-5 row-start-5 col-span-3 md:col-start-1 md:row-start-3 md:col-span-3">
          <lg-input label="Nick Name" [readonly]="true"  controlKey="nickName"></lg-input>
        </div>

        <div class="mb-5 row-start-6 col-span-3 md:col-span-2 md:col-start-5 md:row-start-3 md:self-center" >
          <button type="button" class="w-full btn submit" (click)="addOrEdit()"
          >Create</button>
        </div>        
      </form>
      <div *ngIf="!openByModal"
        class="text-sm text-slate-600 hover:text-blue-900 hover:underline cursor-pointer inline" routerLink="../"
      > <<  Back to Login</div>
    </div>
  </div>
  `,
  styles: ``
})
export class CreateAccountComponent {
  
  @Input() openByModal: boolean = false
  
  users: UserInterface[] = []
  passwordScore: string = ''

  userForm = new FormGroup({
    company: new FormControl(new CompanyClass()),
    gender: new FormControl(''),   
    nickName: new FormControl(''),
  })

  companies: optionItem[] = companyGroup
  genders: optionItem[] = genderGroup

  @Input() selectedCompany!: optionItem 
  
  constructor(private userSerice: UserService, private router: Router, private eventService: EventService){
    this.userSerice.getUserList().subscribe(data => {
      this.users = data
    })
    this.eventService.listen('createUserByCompany', data => this.selectedCompany=data)
  }

  // ngOnInit(){
  //   if (this.openByModal && this.selectedCompany) {
  //     console.log(this.selectedCompany)
  //     // this.userForm.get('company')?.setValue(this.selectedCompany)
  //   }
  // }

  ngOnDestroy(){
    localStorage.removeItem('createAccount')
  }

  capitalizeFirstLetter(str: string): string {
    return [...str][0].toUpperCase() + str.slice(1);
  }

  addOrEdit(){
    
    if (this.userForm.valid){
      if (!this.userForm.get('nickName')?.value) {this.createNickName()}
      const nickName: string = this.userForm.get('nickName')?.value || ''
      const userName: string = this.userForm.get('userName')?.value || ''
      const company: string = this.userForm.get('company')?.value?.v || ''
      const realPassword1: string = this.userForm.get('realPassword1')?.value || ''
      const realPassword2: string = this.userForm.get('realPassword2')?.value || ''
      const index: string = localStorage.getItem('createAccount') || '0'
      if (!this.checkValidUser(userName, nickName)){
        alert(`User Name ${userName} from ${company} company exists. Please create another account!`)
        return
      }

      if (realPassword1 === realPassword2) {
        if (!['good', 'very good'].includes(this.passwordScore.toLowerCase())){
          const confirmation = confirm(`Your password is ${this.passwordScore}. Do you want to check again?`)
        if (confirmation){return}
        }
        const newValue: UserInterface = {
          id: `${parseInt(index)+1}`,
          userName: userName,
          password: realPassword1,
          role: 'user',
          company: this.selectedCompany.value,
          nickName: nickName
        }
        this.userSerice.addUser(newValue).subscribe((data: UserInterface) => {
          this.users.push(data)
          const confirmation = confirm(`User Name ${userName} has been created successfully. Back to login page?`)
          if (confirmation){this.router.navigate(['login'])}
        })        
      }
      else {
        alert(`Password wrong. Please check again!`)
        return
      }
    }
    else {
      alert(`Please fill all required information!`)
        return
    }    
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

  createNickName(){
    const gender = this.userForm.get('gender')?.value 
    const name = this.userForm.get('userName')?.value 
    const company = this.userForm.get('company')?.value 
    if (gender && name && company) this.userForm.get('nickName')?.setValue(`${gender} ${name} - ${company.k}`)      
    else {
      if (this.userForm.get('nickName')?.value) 
        this.userForm.get('nickName')?.reset()
    }    
  }
 
}

