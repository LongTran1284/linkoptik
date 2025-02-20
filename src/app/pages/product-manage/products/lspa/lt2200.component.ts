import { Component } from '@angular/core';
import { ProductCard } from '../../interface/product-interface';
import { getFeatures, getIntroduce, getSpecs, lspa_products } from './lspa-info.component';
import { LspaItemComponent } from './lspa-item.component';

@Component({
  selector: 'app-lt2200',
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
export class Lt2200Component {
  models: string[] = ['LT2200E', 'LT2200']
  model_id: number = 0
  series: string = 'LT2200 Series'
  learn_more: string[] = [
    "https://www.linkoptik.com/english/productshow_54.html", 
    "https://www.linkoptik.com/english/productshow_55.html"
  ]
  slides: string[] = [
    "/assets/2200/LT2200.png", 
    // "/assets/LT2200.png",    
  ]
  
  introduce: string[] = getIntroduce(this.series)
  features: string = getFeatures(this.series)  
  specs: string[] = getSpecs(this.series)    
  similar_products: ProductCard[] = lspa_products.filter((item)=> item.model !== this.series)

}
