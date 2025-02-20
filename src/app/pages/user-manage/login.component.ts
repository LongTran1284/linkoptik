import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LgInput, LgPassword } from 'lg-components';

import { UserInterface } from '../../shared/user-interface';
import { guardKey } from '../../shared/commonValues';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, FormsModule,
    LgInput, LgPassword,
    HttpClientModule,
  ],
  providers: [AuthService, UserService],
  template: `
  <div class=" mt-36 flex items-center justify-center">
    <div class="w-auto h-96 rounded shadow-lg p-10">
      <div class="w-80 ">
        <form [formGroup]="loginForm" (ngSubmit)="login()">
          <div class="mb-5"><lg-input 
            label="User name" icon="contact" [required]="true" controlKey="userName"
          ></lg-input></div>

          <div class="mb-5 "><lg-password
            label="Password" [checkStrength]="false" [required]="true" controlKey="password"            
          ></lg-password></div>

          <div class="mb-5"><lg-input 
            label="Company" [required]="true" controlKey="company"
          ></lg-input></div>

          <div class="flex justify-between">
            <div class="text-sm">
              <p>Do not have an account?</p>
              <p class="cursor-pointer text-blue-600 underline" (click)="createAccount()">Create a new account</p>
            </div>
            <button type="submit" class="btn submit" >Login</button>
          </div>
          
        </form>
      </div>
    </div>
  </div>
  `,
  styles: ``
})
export class LoginComponent {
  loginForm = new FormGroup({})
  users: UserInterface[] = []
  user!: UserInterface

  constructor(
    private router: Router, 
    private eventService: EventService,
    private userService: UserService
  ){
    this.userService.getUserList().subscribe(data => this.users = data)
  }

  _checkCompany(user: UserInterface, company: string){
    const com: string = company.toLowerCase()
    const userNick: string = user.nickName?.replace(/\s/g, "").toLowerCase().split('-')[1] || ''
    const userCom: string = user.company?.toLowerCase() || ''
    if (userNick === com || userCom.includes(com)) return true
    else return false
  }

  _checkValidLogin(userName: string, password: string, company: string){
    if (userName === 'Admin' && password === this.users[0].password) this.user = this.users[0]
    else {
      for (let user of this.users){
        // console.log(user.userName, loginName, '-', user.password, loginPassword, '-', user.nickName)
        if (user.userName === userName && user.password === password && this._checkCompany(user, company)) {
          this.user = user          
          break
        }
      }
    }  
  }

  
  login(){    
    const loginName: string = this.loginForm.get('userName')?.value || ''
    const loginPassword: string = this.loginForm.get('realPassword')?.value || ''
    const company: string = this.loginForm.get('company')?.value || ''
    
    this._checkValidLogin(loginName, loginPassword, company)
        
    if (this.user){
      localStorage.setItem(guardKey, this.user.role)
      localStorage.setItem('userID', this.user.id)
      localStorage.setItem('nickName', this.user.nickName? this.user.nickName : '')
      localStorage.setItem('userName', loginName)
      // if (this.user.role === 'user') {this.router.navigate(['user', this.user.id, 'customer'])}
      // else {this.router.navigate([this.user.role, 'customer'])}
      if (this.user.role === 'user') {this.router.navigate(['user', this.user.id])}
      else {this.router.navigate([this.user.role])}
    } 
    else {alert('Wrong username and password')}    
  }

  createAccount(){
    const lastUser = [...this.users].sort((a, b) => parseInt(b.id) - parseInt(a.id))  // bring the last id to the first place
    this.eventService.emitt('createAccount', lastUser[0]['id'])
    localStorage.setItem('createAccount', `${lastUser[0]['id']}`)    
    localStorage.setItem(guardKey, 'create-account')
    this.router.navigate(['../create-account'])
  }
}
