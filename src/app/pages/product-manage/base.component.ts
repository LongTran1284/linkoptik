import { Component } from '@angular/core';
import { ProductBottomComponent } from './components/product-bottom.component';
import { HeadersComponent } from './components/headers.component';
import { NavbarComponent } from './components/navbar.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'linkoptik-base',
  standalone: true,
  imports: [
    ProductBottomComponent, HeadersComponent, NavbarComponent, 
    RouterOutlet
  ],
  template: `
  <div class="container-fluid">      
    <headers></headers>
    <navbar></navbar>
    <router-outlet></router-outlet>
    @if (show_bottom){
      <product-bottom></product-bottom>
    }    
  </div>
    
  `,
  styles: ``
})
export class BaseComponent {

  show_bottom: boolean = true
    
  constructor(private router: Router){
    this.router.events.subscribe(x => {      
      if(x instanceof NavigationEnd){
        if (x.url.includes('/about') || x.url.includes('/cong-nghe') || x.url.includes('/contact')) this.show_bottom = false
        else this.show_bottom = true
        // window.scrollTo({ top: 0, behavior: 'smooth' })  
        window.scrollTo({ top: 0 })        
      }
    });
  }
    
}
