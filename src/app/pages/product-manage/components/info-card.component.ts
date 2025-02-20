import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'info-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="border border-cyan-500 p-3 rounded-lg shadow-sm " id="{{id}}"
      [ngClass]="lastOne ? '' : 'mb-10'" 
    >
      <div class="bg-cyan-100 border-b border-cyan-500 px-5 py-3 -mx-3 -mt-3 rounded-t-lg">
        <p class="h3 text-cyan-700">{{title}}</p>
      </div>  
      <div class="h5 mt-2">
        <ng-content></ng-content>
      </div>          
    </div>        
  `,
  styles: ``
})
export class InfoCardComponent {
  @Input() id: string = ''
  @Input() title: string = ''
  @Input() lastOne: boolean = false
}
