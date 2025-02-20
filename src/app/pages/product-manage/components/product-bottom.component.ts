import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'product-bottom',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="height: 60px;"></div>
    <div class="w-full my_bottom" [ngClass]="{'show_bottom': windowScrolled}">
      <div class="ml-2 md:ml-[60px]" >
        <div *ngIf="!top_only">
          <a routerLink="/contact" [queryParams]="{sec:'quote'}" class="px-4 py-2 w-20 text-base rounded-3xl submit mr-3">
            {{ screen_width < 700 ? 'Request' : 'Request a quote'}}
          </a>
          <a routerLink="/contact" [queryParams]="{sec:'contact'}" class="px-4 py-2 w-20 text-base rounded-3xl submit">    
            {{ screen_width < 700 ? 'Contact' : 'Contact Us'}}                   
          </a>
        </div>        
      </div>
      
      <div class="mr-2 md:mr-[60px]">
        <button (click)="scrollToTop()" class="text-3xl bold  h-[40px] w-[40px] submit rounded-full"> &#8593; </button>
      </div>
    </div>
  `,
  styles: ``
})
export class ProductBottomComponent {
  @Input() top_only: boolean = false
  windowScrolled : boolean = false
  screen_width: number = 0

  @HostListener('window:resize', ['$event']) onResize(){
    this.screen_width = window.screen.availWidth
  }

  ngOnInit() {
    this.onResize()
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200){this.windowScrolled = true}
      else {this.windowScrolled = false}
    });
  }


  scrollToTop(): void{
    window.scrollTo(0, 0);
  }
}
