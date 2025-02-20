import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'headers',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="w-full px-2 md:px-5">
      <div class="w-full grid grid-cols-[60px_auto] md:grid-cols-[110px_auto] lg:grid-cols-[110px_auto_auto] gap-2">          
        <a routerLink="" class="">
          <img src="/assets/logo_HL_small.png" alt="logo_hl" >
        </a>
        <div class=" flex items-center justify-center lg:justify-start " >
          <div class="text-center ">
            <h2 class="text-base md:text-3xl font-bold text-red-600">HIEN LONG TECHNOLOGY CORPORATION</h2>
            <hr class="my-2 hidden md:block">
            <h4 class="hidden md:block md:text-xl font-bold text-blue-400">Specialize in supplying laboratory equipments</h4>
          </div>          
        </div>  
      </div>    
    </header>
  `,
  styles: ``
})
export class HeadersComponent {

}
