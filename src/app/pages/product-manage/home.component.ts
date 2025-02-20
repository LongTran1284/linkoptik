import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InfoCardComponent } from './components/info-card.component';
import { ProductCard } from './interface/product-interface';
import { lspa_products } from './products/lspa/lspa-info.component';
import { ProductCardComponent } from './components/product-card.component';
import { CommonModule } from '@angular/common';
import { contact_info } from '../../shared/commonValues';
import { TextPipe } from '../../pipes/text.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule, CommonModule, TextPipe,
    InfoCardComponent, ProductCardComponent
  ],
  template: `
  <div class="container mx-auto pt-10">      
    <info-card title="GIỚI THIỆU">
      <div class="flex flex-col gap-5 justify-between md:flex-row md:justify-around items-center py-5">
        <a [routerLink]="['./about']" [queryParams]="{sec: 'hienlong'}">
          <img src="/assets/logo_HL_small.png" alt="logo_HL_small">
        </a>
        <a [routerLink]="['./about']" [queryParams]="{sec: 'linkoptik'}">
          <img src="/assets/logo_linkoptik.png" alt="logo_linkoptik">
        </a>        
      </div>
    </info-card>

    <info-card title="SẢN PHẨM">
      <product-card type="all" [products]="products"></product-card>
    </info-card>

    <info-card title="CÔNG NGHỆ">
      <div class="text-cyan-700  mx-5 md:mx-20 lg:mx-40 divide-y-2 divide-cyan-600 ">
        <a *ngFor="let v of quickViews" [routerLink]="v.link" 
          class="hover:italic cursor-pointer py-2 block" >{{v.text}}</a>
      </div>
    </info-card>

    <div class="bg-sky-500 p-5 mb-3 rounded shadow-sm">
      <div class="ml-0 md:ml-3 lg:ml-5 max-w-full md:max-w-[350px] flex justify-center flex-col">
        <p class="text-base md:text-lg text-rose-500 font-bold">{{contact_info.company}}</p>
        <p class="text-sm md:text-base text-blue-500">{{contact_info.address}}</p>
        <p [innerHTML]="contact_info.contact | text:'list'" class="text-sm md:text-base text-slate-500"></p>
      </div>
    </div>
  </div>
    
  `,
  styles: ``
})
export class HomeComponent {
  products: ProductCard[] = lspa_products
  quickViews: any[] = [        
    {text: 'Ý nghĩa của sự phân bố kích thước hạt', link: './cong-nghe'},
    {text: 'Airy Disk', link: './cong-nghe/airy-disk'},
    {text: 'ACAD và cách xử lý', link: './cong-nghe/acad'},
    {text: 'Bộ lọc sợi phân cực', link: './cong-nghe/filter'},
    {text: 'Cửa sổ hình thang nghiêng và cảm biến dò góc siêu lớn', link: './cong-nghe/trapezoidal-window'},
    {text: 'Đèn Laser', link: './cong-nghe/laser'},
  ]
    
  contact_info: any = contact_info
  // constructor(private router: Router){}

  // ngOnInit() {
  //   this.router.events.subscribe(x => {      
  //     if(x instanceof NavigationEnd){
  //       window.scrollTo({ top: 0, behavior: 'smooth' })        
  //     }
  //   });
  // }

  
  
}
