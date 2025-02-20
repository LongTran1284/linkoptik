import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LgSlideShow } from 'lg-components';
import { ProductBreadcrumbComponent, breadcrumbProp } from '../../components/product-breadcrumb.component';
import { DisperserComponent } from './disperser.component';
import { ProductCardComponent } from '../../components/product-card.component';
import { ProductCard } from '../../interface/product-interface';
import { TextPipe } from '../../../../pipes/text.pipe';
import { AccessoriesComponent } from './accessories.component';

@Component({
  selector: 'lspa-item',
  standalone: true,
  imports: [
    CommonModule, RouterModule, LgSlideShow, TextPipe, 
    ProductBreadcrumbComponent, ProductCardComponent, 
    DisperserComponent, AccessoriesComponent    
  ],
  changeDetection: ChangeDetectionStrategy.OnPush, // getter detects change onPush only
  template: `
    <div class="container mx-auto">          
      <product-breadcrumb [items]="breadcumItems"></product-breadcrumb>
      
      <header class="block lg:grid lg:row-start-1 lg:grid-cols-[auto_250px] lg:gap-x-5 ">     
        <div class=" lg:col-start-2 border border-cyan-100 rounded-lg bg-cyan-100 shadow-sm mx-auto p-3 w-fit lg:h-fit">
          <h3 class="h3 mb-2 italic text-cyan-900">Xem nhanh:</h3>
          <div class="text-cyan-700 flex flex-col ml-2">            
            <p *ngFor="let v of quickViews" 
                class="hover:underline cursor-pointer" (click)="goToElement(v.link)">{{v.text}}</p>
          </div>        
        </div>

        <div class=" lg:col-start-1 lg:row-start-1 h-content">
          <h1 class="my-3 h1 text-amber-700 text-center md:text-start">Máy đo kích thước hạt {{ series }} </h1>
          <div class="w-full">
          <lg-slide-show [images]="slides" [autoPlay]="false" [slideTime]="300" height="400px" ></lg-slide-show>
          </div>          
        </div>               
      </header>
      
      <div class="my-5" id="introduce">
        <p [innerHTML]="introduce[0] | text:'bold':'list(none;3)'"></p> 
        <p [innerHTML]="introduce[1] | text:'bold':'list(square1;#7c3aed 3)'"></p> 
      </div>      

      <div class="m-5">
        <img src="/assets/{{diagram.folder}}/{{diagram.name}}.png" alt="{{diagram.name}}">
      </div>

      <div id="features">
        <h2 class="h2 text-emerald-700 my-5">Những đổi mới và tính năng nổi bật:</h2>
        <p [innerHTML]="features | text:'bold':'list(arrow;blue 2)':'linkTab((xem thêm); purple b i u)' "></p>
      </div>

      <div class="my-5">
        <div class="md:grid md:grid-cols-[400px_auto] " id="specification">
          <h2 class="h2 text-emerald-700 my-5">Thông số kỹ thuật của {{ models[model_id] }}</h2>
          <div class=" my-auto text-center md:text-start">
            <button class="model_1" [disabled]="model_id===0" (click)="model_id=0">{{ models[0] }}</button>
            <button class="model_2" [disabled]="model_id===1" (click)="model_id=1">{{ models[1] }}</button>
          </div>          
        </div>
        <div [innerHTML]="specs[model_id] | text:'list(diamond;blue 2)'"></div>  
        <div class="my-3 link">
          <a href="{{ learn_more[model_id] }}" target="_blank" >Learn more from Linkoptik</a> 
        </div>          
      </div>

      <div id="dispersion">
        <h2 class="h2 text-emerald-700">Các hệ thống phân tán dùng cho {{series}}:</h2>
        <disperser series="{{series}}"></disperser> 
      </div>

      <div id="accessories">
        <h2 class="h2 text-emerald-700">Phụ kiện - Accessories</h2>
        <accessories series="{{series}}"></accessories>
      </div>
      
      <br>
      <hr>
      <div id="similar">
        <h6 class="text-lg text-emerald-700 font-semibold">Các sản phẩm tương tự</h6>
        <product-card type="similar" [products]="similar_products"></product-card>
      </div>
    </div>
  `,
  styles: ``
})
export class LspaItemComponent {
  @Input() models: string[] = []    
  @Input() series: string = ''
  @Input() learn_more: string[] = []
  @Input() slides: string[] = []
  @Input() introduce: string[] = []
  @Input() features: string = ''  
  @Input() specs: string[] = []
  @Input() similar_products: ProductCard[] = []

  model_id: number = 0

  get breadcumItems(){
    let items: breadcrumbProp[] = [
        {item: 'Product', path:'../../../products'},
        {item: 'LSPA', path:'../../may-do-kich-thuoc-hat'},
        {item: this.series}
      ]
    return items
  }

  
  get diagram(){
      let name = this.series.replace(' Series', '_diagram')
      let folder = this.series.replace(' Series', '').replace('LT', '')
      return {name: name, folder: folder}
  }

  quickViews: any[] = [        
      {text: 'Giới thiệu', link: 'introduce'},
      {text: 'Những đổi mới và tính năng', link: 'features'},
      {text: 'Thông số kỹ thuật', link: 'specification'},
      {text: 'Hệ thống phân tán', link: 'dispersion'},
      {text: 'Phụ kiện', link: 'accessories'},
      {text: 'Sản phẩm tương tự', link: 'similar'},
  ]
  
  goToElement(el: string){
      const element = document.getElementById(el); 
      if (element) { element.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }
}
