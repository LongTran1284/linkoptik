import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { breadcrumbProp, ProductBreadcrumbComponent } from '../../components/product-breadcrumb.component';
import { ProductCardComponent } from '../../components/product-card.component';
import { ProductCard } from '../../interface/product-interface';
import { getFeatures, lspa_products } from './lspa-info.component';
import { TextPipe } from '../../../../pipes/text.pipe';

@Component({
  selector: 'lspa',
  standalone: true,
  imports: [
    CommonModule,
    ProductBreadcrumbComponent, ProductCardComponent,
    TextPipe,     
  ],
  template: `
    <div class="container mx-auto">         
      <product-breadcrumb [items]="breadcumItems"></product-breadcrumb> 
      <div>
        <h2 class="h2 text-emerald-700 my-5">Giới thiệu</h2>
        <p class="mt-3" [innerHTML]="introduce | text:'list(;2)' "></p>
      </div>
      
      <div>
        <h2 class="h2 text-emerald-700 my-5">Những đổi mới và tính năng nổi bật</h2>
        <p [innerHTML]="features | text:'bold':'list(arrow;blue 2)':'linkTab((xem thêm); purple b i u)' "></p>
      </div>
      <product-card type="all" [products]="products"></product-card> 
    </div>
  `,
  styles: ``
})
export class LspaComponent {
  breadcumItems: breadcrumbProp[] = [
    {item: 'Product', path:'../'},
    {item: 'LSPA'}
  ]
  products: ProductCard[] = lspa_products

  
  introduce: string = `
  Máy đo kích thước hạt bằng laser là thiết bị đo hạt dựa trên lý thuyết tán xạ Mie. 
  Nguyên lý vật lý là khi ánh sáng gặp vật cản (hạt) trong quá trình truyền, một phần ánh sáng sẽ tán xạ khỏi hướng truyền ban đầu và góc tán xạ có liên quan đến kích thước hạt. Hạt có kích thước càng nhỏ sẽ có góc tán xạ càng lớn. 
  Sau khi đo được sự phân bố năng lượng ánh sáng tán xạ của các hạt mẫu, thuật toán đảo ngược được sử dụng để tính toán sự phân bố kích thước hạt. Vì tia laser có độ sáng cao, định hướng cao được sử dụng làm nguồn sáng nên nó được gọi là "Máy đo kích thước hạt nhiễu xạ laser". 
  Thiết bị này bao gồm một bộ phận quang học (còn được gọi là "hệ thống/nền tảng quang học"), bộ phận phân tán mẫu đưa mẫu vào khu vực đo của bộ phận quang học và một máy tính được trang bị phần mềm bao gồm thuật toán đảo ngược và giao diện điều khiển. 
  `
  
  features: string = getFeatures('LT3600 Series')

}
