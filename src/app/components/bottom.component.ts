import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LgIcon } from 'lg-components';

@Component({
  selector: 'app-bottom',
  standalone: true,
  imports: [CommonModule, LgIcon],
  template: `
    <div class="h-16"></div>
    <div class="w-full h-16 flex justify-end items-center fixed bottom-0 right-0" 
      [ngClass]="windowScrolled ? 'show_bottom' : 'opacity-0'">     
      <div class="text-blue-500 text-4xl mx-3 cursor-pointer" (click)="scrollToTop()">
        <lg-icon name="circle-chevron-up"></lg-icon>
      </div>     
    </div>
  `,
  styles: ``
})
export class BottomComponent {

  windowScrolled : boolean = false

  ngOnInit() {    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100){this.windowScrolled = true}
      else {this.windowScrolled = false}
    });
  }


  scrollToTop(): void{
    window.scrollTo(0, 0);
  }
}
