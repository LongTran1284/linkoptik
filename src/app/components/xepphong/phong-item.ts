import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'phong-item',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="flex flex-col items-center my-5 ">
    <div class="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center bg-slate-200 font-bold text-lg"
    >{{num}}</div>
    <div class="border border-slate-200 w-full rounded-lg shadow-md">
      <div class="bg-red-300 h-[50px] flex flex-col items-center justify-center rounded-t-lg ">
        <span *ngFor="let item of masterRoom">{{item}}</span>
      </div>
      <div class="bg-lime-300 h-[50px] flex flex-col items-center justify-center">
        <span *ngFor="let item of doubleRoom1">{{item}}</span>
      </div>
      <div class="bg-teal-200 h-[50px] flex flex-col items-center justify-center" 
      [ngClass]="{'rounded-b-lg': !livingRoom.length}">
        <span *ngFor="let item of doubleRoom2">{{item}}</span>
      </div>
      <div class="bg-slate-300 flex flex-col items-center justify-center rounded-b-lg">
        <span *ngFor="let item of livingRoom">{{item}}</span>
      </div>
    </div>
  </div>
  `,
  styles: ``
})
export class PhongItemComponent {

    @Input() masterRoom: string[] = []
    @Input() doubleRoom1: string[] = []
    @Input() doubleRoom2: string[] = []
    @Input() livingRoom: string[] = []
    @Input() num: number = 0 
  
}
