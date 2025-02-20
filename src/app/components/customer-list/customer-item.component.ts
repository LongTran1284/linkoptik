import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LgIcon } from 'lg-components';
import { HoverIdDirective } from '../../directives/hover-id.directive';
import { CustomerClass } from '../../shared/customer-interface';

@Component({
  selector: 'customer-item',
  standalone: true,
  imports: [
    RouterModule, CommonModule, LgIcon,
    HoverIdDirective,
  ],
  template: `
  
  <div class="border-b border-r border-t border-slate-300 rounded mb-px p-2 text-slate-800 opacity-80 hover:opacity-100 relative" 
    [ngStyle]="{'border-left-width': border_w}"
    [ngClass]="status==='success' ? 'hover:border-lime-600' : (status==='fail'? 'hover:border-red-500' :'hover:border-blue-500')"
    [hoverId]="{itemRef: item, idRef: id}" #item 
  >  
    <div class="absolute  top-0 bottom-0  flex items-center justify-center " #id
      [ngStyle]="{'left': left, 'width': width}"
    >{{ stt }}</div>
    <!-- <div class="text-lg font-bold">{{ data.companyName }}</div> -->
    <div class="text-sm inline-block" [ngClass]="{'text-lime-600' : status==='success', 'text-red-500' : status==='fail'}">
      <span class="text-base font-bold">{{ data.companyName }}</span>
      <span *ngIf="data.province">&nbsp;&nbsp;  | &nbsp;&nbsp;  {{ data.province }}</span>
      <span *ngIf="data.application">&nbsp;&nbsp;  | &nbsp;&nbsp;  {{ data.application }}</span>
      <span *ngIf="data.model">&nbsp;&nbsp;  | &nbsp;&nbsp;  {{ data.model }}</span>
      <span *ngIf="data.orderDate">&nbsp;&nbsp;  | &nbsp;&nbsp;  {{ data.orderDate }}</span>
      <span *ngIf="data.seller">&nbsp;&nbsp;  | &nbsp;&nbsp;  {{ data.seller }}</span>
      <span *ngIf="data.subdealer" class="text-teal-500 inline-block ml-3"><lg-icon name="handshake-simple"></lg-icon></span>
    </div>
  </div>
  
  `,
  styles: ``
})
export class CustomerItemComponent {
  @Input() data: CustomerClass = new CustomerClass()
  @Input() stt: number = 1

  w: number = 38
  
  get width() {return `${this.w}px`}
  get left() {return `-${this.w+2}px`}
  get border_w() {return `${this.w+4}px`}
 
  get status(){return this.data.status.toLowerCase()}

 
  ngOnInit(){  
    const step = this.stt.toString().length - 4
    if (step > 0) this.w += 10*step       
  }
}
