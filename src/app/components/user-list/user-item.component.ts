import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LgIcon } from 'lg-components';
import { HoverIdDirective } from '../../directives/hover-id.directive';
import { CustomerClass } from '../../shared/customer-interface';
import { UserClass, UserInterface } from '../../shared/user-interface';

@Component({
  selector: 'user-item',
  standalone: true,
  imports: [
    RouterModule, CommonModule, LgIcon,
    HoverIdDirective,
  ],
  template: `
  
  <div class="border-b border-r border-t border-slate-300 rounded mb-px p-2 text-slate-800 opacity-80 hover:opacity-100 relative" 
    
     #item
    [hoverId]="{itemRef: item, idRef: id}" 
  >  
  <!-- [ngStyle]="{'border-left-width': border_w}"
  [ngClass]="status==='success' ? 'hover:border-lime-600' : (status==='fail'? 'hover:border-red-500' :'hover:border-blue-500')"
    [routerLink]="[user_data.id]" [state]="final_data" -->
    <div class="absolute  top-0 bottom-0  flex items-center justify-center " #id
      
    >{{ user_data.userName }}</div>
    <!-- [ngStyle]="{'left': left, 'width': width}" -->
    <!-- <div class="text-lg font-bold">{{ data.companyName }}</div> -->
    <!-- <div class="text-sm inline-block" [ngClass]="{'text-lime-600' : status==='success', 'text-red-500' : status==='fail'}">
      <span class="text-base font-bold">{{ user_data.companyName }}</span>
      <span *ngIf="user_data.province">&nbsp;&nbsp;  | &nbsp;&nbsp;  {{ user_data.province }}</span>
      <span *ngIf="user_data.application">&nbsp;&nbsp;  | &nbsp;&nbsp;  {{ user_data.application }}</span>
      <span *ngIf="user_data.model">&nbsp;&nbsp;  | &nbsp;&nbsp;  {{ user_data.model }}</span>
      <span *ngIf="user_data.orderDate">&nbsp;&nbsp;  | &nbsp;&nbsp;  {{ user_data.orderDate }}</span>
      <span *ngIf="user_data.seller">&nbsp;&nbsp;  | &nbsp;&nbsp;  {{ user_data.seller }}</span>
      <span *ngIf="user_data.subdealer" class="text-teal-500 inline-block ml-3"><lg-icon name="handshake-simple"></lg-icon></span>
    </div> -->
  </div>
  
  `,
  styles: ``
})
export class UsertItemComponent {
  @Input() user_data: UserClass = new UserClass()
  @Input() stt: number = 1
  @Input() seller: string = '' // admin or users (Mr. Long - HLSG) in order to disable seller selectbox

  w: number = 38

  
  // get width() {return `${this.w}px`}
  // get left() {return `-${this.w+2}px`}
  // get border_w() {return `${this.w+4}px`}
 
  // get status(){return this.user_data.status.toLowerCase()}

  // get final_data(){
  //   return {...this.user_data, manager: this.seller}
  // }
 
  ngOnInit(){  
    console.log(this.user_data)
  //   const step = this.stt.toString().length - 4
  //   if (step > 0) this.w += 10*step       
  }
}
