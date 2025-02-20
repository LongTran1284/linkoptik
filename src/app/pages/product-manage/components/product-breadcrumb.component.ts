import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface breadcrumbProp {
  item: string, path?: string
}

@Component({
  selector: 'product-breadcrumb',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div id="breadcum-container" class="flex items-center my-3">
      <div id="logo" class="mr-5 max-w-[300px] hidden md:block" *ngIf="logo !== ''">
        <a [routerLink]="['/about']" [queryParams]="{sec: brands[logo].brand}">
          <img  src="{{ brands[logo].img }}" alt="{{ brands[logo].img }}" aria-hidden="true" >
        </a>
      </div>
      
      <div id="content" class="flex justify-center ">    
        <div *ngFor="let item of items; index as j">    
          @if(j < items.length-1){
            <a routerLink="{{item.path}}" class="hover:text-blue-600 hover:underline">{{item.item}}</a>          
            <span class="text-slate-500">&nbsp; > &nbsp;</span>   
          }
          @else {
            <p class="text-slate-500">{{item.item}}</p>
          }
        </div>        
      </div>    
    </div>
  `,
  styles: ``
})
export class ProductBreadcrumbComponent {
  @Input() items: breadcrumbProp[] = []
  @Input() logo: string = 'linkoptik'
  brands: any = {
    'hien long': {img: '/assets/logo_HL_small.png', brand: 'hienlong'},
    'linkoptik': {img: '/assets/logo_linkoptik.png', brand: 'linkoptik'}
  }

  // ngOnInit(){console.log(this.brands[this.logo].path)}
}
