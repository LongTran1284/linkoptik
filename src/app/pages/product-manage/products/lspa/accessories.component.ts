import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TextPipe } from '../../../../pipes/text.pipe';
import { getAccessories } from './lspa-info.component';

@Component({
  selector: 'accessories',
  standalone: true,
  imports: [CommonModule, TextPipe],
  template: `
    <div class="flex flex-wrap justify-start my-5">
      <!-- <div class="text-lg font-semibold text-sky-700 ml-3">1/ Phân tán lỏng (nước, dung môi lỏng):</div>       -->
      <div class="w-full flex flex-col md:grid md:grid-cols-[220px_auto] lg:grid-cols-[300px_auto] border shadow-lg border-slate-200 rounded-xl mx-3 my-5" 
      *ngFor="let item of accessories">
        <div >
          <img src="{{ item.img }}" alt="{{ item.model }}">
        </div>        
        <div class="pl-5 mb-5">
          <h5 class="text-xl font-bold text-center md:text-start my-3">{{ item.model }}</h5>
          <div class="flex " >
            <p [innerHTML]="item.text | text:'list(diamond; red)':'linkTab((xem thêm); purple b i)'" ></p>
          </div>
        </div>
      </div>
      
    </div>  
  `,
  styles: ``
})
export class AccessoriesComponent {
  @Input() series: string = ''

  get accessories(){
    return getAccessories(this.series)
  }
}
