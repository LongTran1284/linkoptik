import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductCard } from '../../interface/product-interface';
import { dry_disperser, getWetDisperser } from './lspa-info.component';
import { TextPipe } from '../../../../pipes/text.pipe';

@Component({
  selector: 'disperser',
  standalone: true,
  imports: [
    CommonModule, TextPipe,
  ],
  template: `
    <div class="flex flex-wrap justify-start my-5">
      <div class="text-lg font-semibold text-sky-700 ml-3">1/ Phân tán lỏng (nước, dung môi lỏng):</div>      
      <div class="w-full flex flex-col md:grid md:grid-cols-[220px_auto] lg:grid-cols-[300px_auto] border shadow-lg border-slate-200 rounded-xl mx-3 my-5" 
      *ngFor="let item of wet">
        <div >
          <img src="{{ item.img }}" alt="{{ item.model }}">
        </div>        
        <div class="pl-5 mb-5">
          <h5 class="text-xl font-bold text-center md:text-start my-3">{{ item.model }}</h5>
          <div class="flex " >
            <p [innerHTML]="item.text | text:'list(diamond; red)'" ></p>
          </div>
        </div>
      </div>

      <div class="text-lg font-semibold text-sky-700 ml-3 mt-5">2/ Phân tán khô (không khí):</div>      
      <div class="w-full flex flex-col md:grid md:grid-cols-[220px_auto] lg:grid-cols-[300px_auto] border shadow-lg border-slate-200 rounded-xl mx-3 my-5" 
      *ngFor="let item of dry">
        <div>
          <img src="{{ item.img }}" alt="{{ item.model }}">
        </div>        
        <div class="pl-5 mb-5">
          <h5 class="text-xl font-bold text-center md:text-start my-3">{{ item.model }}</h5>
          <div class="flex" >
            <p [innerHTML]="item.text | text:'list(diamond; red)'" ></p>
          </div>
        </div>
      </div>
    </div>  
  `,
  styles: ``
})
export class DisperserComponent {
  @Input() series: string = '2200' 
  dry: ProductCard[] = dry_disperser
  
  get wet(){    
    return getWetDisperser(this.series)
  }
}
