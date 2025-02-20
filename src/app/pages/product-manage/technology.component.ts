import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LgIcon } from 'lg-components';

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterModule,
    LgIcon, 
  ],
  template: `
    <div class=" px-3 md:grid md:gap-3 h-[85vh] md:px-0 md:grid-cols-[150px_auto] md:h-[78vh] ">     
      <div class="h-fit lg:h-full pt-2  ">
        <div class="border-cyan-100 bg-cyan-100 shadow-sm rounded-lg relative">
          <div class="flex items-center gap-5 md:block px-2 py-1 text-cyan-900">
            <h3 class="h3 italic ">Nội dung</h3>
            <div class="block md:hidden" (click)="show_qv=!show_qv"><lg-icon name="angle-down"></lg-icon></div>
          </div>

          <div class="text-cyan-700  ml-2 divide-y-2 divide-white hidden md:block ">
            <a *ngFor="let v of quickViews" [routerLink]="v.link" 
              class="hover:underline cursor-pointer py-2 md:block" >{{v.text}}</a>
          </div>
          <div class="text-cyan-700 bg-slate-100 divide-y divide-cyan-800 absolute p-2 md:hidden "
            [ngClass]="show_qv? 'visible':'invisible'"
          >
            <p *ngFor="let v of quickViews" [routerLink]="v.link" (click)="show_qv=false" 
              class="hover:underline cursor-pointer py-2  md:block" >{{v.text}}</p>
          </div>
        </div>
      </div> 

      <div class=" md:px-3 py-2 overflow-y-auto " >     
        <router-outlet></router-outlet>           
      </div>
    </div>    
    
  `,
  styles: ``
})
export class TechnologyComponent {
  quickViews: any[] = [        
    {text: 'Ý nghĩa của sự phân bố kích thước hạt', link: '.'},
    {text: 'Airy Disk', link: 'airy-disk'},
    {text: 'ACAD và cách xử lý', link: 'acad'},
    {text: 'Bộ lọc sợi phân cực', link: 'filter'},
    {text: 'Cửa sổ hình thang nghiêng và cảm biến dò góc siêu lớn', link: 'trapezoidal-window'},
    {text: 'Đèn Laser', link: 'laser'},
  ]

  show_qv: boolean = false // quickViews in small screen
  
   
}
