import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCard } from '../interface/product-interface';
import { TextPipe } from '../../../pipes/text.pipe';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, TextPipe],
  template: `

  <div class="flex flex-wrap justify-around my-5">
    <div class="card_item" *ngFor="let item of products">
      @if(type === 'similar'){
        <a [routerLink]="['','products', 'may-do-kich-thuoc-hat',item.path]">
        <!-- <a href="{{ item.path }}"> -->
          <div class="card_image">
            <img src="{{ item.img }}" alt="{{ item.model }}">
          </div>        
          <div class="text-center mb-5">
            <h5 class="text-xl font-bold">{{ item.model }}</h5>
            <div class="my-5 flex justify-center" >
              <p [innerHTML]="item.text | text:'list(diamond; red)'" ></p>
            </div>
          </div>
        </a>
      }
      @else {
        <div class="bg-slate-300 text-xl font-bold h-[40px] rounded-t-xl flex justify-center items-center ">
          {{ item.model }}
        </div>

        <div class="card_image">
          <a [routerLink]="['','products', 'may-do-kich-thuoc-hat',item.path]">
          <!-- <a href="{{ item.path }}"> -->
            <img src="{{ item.img }}" alt="{{ item.model }}">
          </a>
        </div>        
        <div class="text-center mb-5">
          <div class="mb-5 flex justify-center" >
            <p [innerHTML]="item.text | text:'list(diamond; red)'" ></p>
          </div>
          
          <a [routerLink]="['','products', 'may-do-kich-thuoc-hat',item.path]" class=" btn submit hover:opacity-90">Chi tiết</a>
        </div>
      }
    </div>
    
  </div>

  `,
  styles: ``
})
export class ProductCardComponent {
  @Input() products: ProductCard[] = []
  @Input() type: string = 'similar'
}
