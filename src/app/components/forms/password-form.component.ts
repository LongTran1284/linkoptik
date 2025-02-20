import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { LgIcon, LgPassword } from 'lg-components';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'password-form',
  standalone: true,
  imports: [
    CommonModule, 
    LgIcon, LgPassword,   
    FormsModule, ReactiveFormsModule
  ],
  providers: [],
  template: `
    <div class=" rounded shadow-lg p-2 border relative">      
      <form *ngIf="!isResetting" [formGroup]="passwordForm" (ngSubmit)="changePassword()">        
        <div class=" mb-5 ">
          <lg-password id="1" label="Password" [required]="true" [checkStrength]="true" controlKey="password"
            (view_score)="passwordScore=$event"
          ></lg-password>
        </div>

        <div class=" mb-5 " >
          <lg-password id="2" label="Confirm Password" [required]="true" controlKey="passwordConfirm"></lg-password>
        </div>       
       
        <div class="mb-5 " >
          <button type="submit" class="w-full btn submit">Change</button>
        </div>
        
      </form>
    </div>
  `,
  styles: ``
})
export class PasswordFormComponent {
  @Output() update_data = new EventEmitter()

  isResetting: boolean = false  
  passwordScore: string = ''
  passwordForm = new FormGroup({})

  constructor(private eventService: EventService){
    this.eventService.listen('openPasswordForm', data => {
      // reset form when opening
      this.isResetting = true
      setTimeout(() => {
        this.isResetting = false
      }, 0);
    })
  }
  
  changePassword(){
    // console.log(this.passwordScore)
    const password = this.passwordForm.get('realPassword1')?.value
    const confirmPassword = this.passwordForm.get('realPassword2')?.value

    if (password === confirmPassword){this.update_data.emit(password)} 
    else {alert('Wrong password!! Please try again.')}    
  }
  
}

