import { Component } from '@angular/core';
import { ProductBreadcrumbComponent, breadcrumbProp } from '../components/product-breadcrumb.component';
import { ProductCardComponent } from '../components/product-card.component';
import { StyleTextPipe } from '../../../pipes/style-text.pipe';
import { ProductCard } from '../interface/product-interface';
import { lspa_products } from './lspa/lspa-info.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TextPipe } from '../../../pipes/text.pipe';

@Component({
  selector: 'app-linkoptik',
  standalone: true,
  imports: [CommonModule, TextPipe,
    ProductBreadcrumbComponent, ProductCardComponent,
    TextPipe, RouterModule
  ],
  template: `
    <div class="container mx-auto">      
      <product-breadcrumb [items]="breadcumItems"></product-breadcrumb>
      <!-- <p class="mt-3" [innerHTML]="introduce | text:'list(;2)' "></p> -->
        
      <h1 class="h1 text-red-500 mt-5 mb-1">Các sản phẩm chính:</h1>
      <div class=" border border-cyan-100 rounded-lg bg-cyan-100 shadow-sm mb-5 px-5 py-3 w-full h-fit">
        <div *ngFor="let p of product_list; index as j"
          class="text-cyan-700 hover:underline cursor-pointer" [ngClass]="{'mb-2': j<product_list.length-1}"
          (click)="goToElement(p.id)"
        >
          <span [innerHTML]="j+1 + '/ ' + p.text + '\n' +p.extra | text:'list'"></span>
        </div>
      </div>

      <ng-container *ngFor="let p of product_list">
        <div class="border border-cyan-500 p-3 rounded-lg shadow-sm mb-10" id="{{p.id}}">
          <div class="bg-cyan-100 border-b border-cyan-500 px-5 py-3 -mx-3 -mt-3 rounded-t-lg">
            <a routerLink="{{p.link}}" class="h3 mb-5 text-cyan-700">{{p.text}}</a>
          </div>        
          <product-card type="all" [products]="p.product"></product-card>  
        </div>
      </ng-container>
    </div>    
  `,
  styles: ``
})
export class LinkoptikComponent {
  brand: string = 'Linkoptik'
  breadcumItems: breadcrumbProp[] = [
    {item: 'Product'},
    // {item: 'Linkoptk'}
  ]

  products: ProductCard[] = lspa_products
  product_list: any[] = [
    {
      text:'Máy đo kích thước hạt (micron) - Laser particle size analyzer',
      extra:'Khoảng đo lên đến 0.01 - 3600 #um',
      product: lspa_products, id:'lspa', link:'./may-do-kich-thuoc-hat'
    },
    {
      text:'Máy đo kích thước hạt (nano) - Nano particle size analyzer', 
      extra:'Khoảng đo lên đến 0.1 - 1000 nm',
      product: lspa_products, id:'nano', link:'./may-do-kich-thuoc-hat'
    }
  ]

  goToElement(el: string){
    const element = document.getElementById(el); 
    if (element) { element.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }
}
