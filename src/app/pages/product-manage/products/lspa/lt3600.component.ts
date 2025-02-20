import { Component } from '@angular/core';
import { ProductCard } from '../../interface/product-interface';
import { getFeatures, getIntroduce, getSpecs, lspa_products } from './lspa-info.component';
import { LspaItemComponent } from './lspa-item.component';

@Component({
  selector: 'lt3600',
  standalone: true,
  imports: [LspaItemComponent],
  template: `
    <lspa-item 
      [models]="models"  [learn_more]="learn_more" 
      [slides]="slides" [introduce]="introduce" [features]="features" [specs]="specs"
      [similar_products]="similar_products" [series]="series"
    ></lspa-item>
  `,
  styles: ``
})
export class Lt3600Component {
  models: string[] = ['LT3600', 'LT3600 Plus']
  model_id: number = 0
  series: string = 'LT3600 Series'
  
  learn_more: string[] = [
    "https://www.linkoptik.com/english/productshow_59.html", 
    "https://www.linkoptik.com/english/productshow_58.html"
  ]
  slides: string[] = [
    "/assets/3600/LT3600.png", 
    "/assets/3600/LT3600_with_dispersers.png",    
  ]

  introduce: string[] = getIntroduce(this.series)
  features: string = getFeatures(this.series)
  specs: string[] = getSpecs(this.series)
  similar_products: ProductCard[] = lspa_products.filter((item)=> item.model !== this.series) 
  
}
