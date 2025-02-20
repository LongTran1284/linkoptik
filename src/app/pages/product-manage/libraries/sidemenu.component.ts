import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { SidemenuService } from './sidemenu.service';

@Component({
  selector: 'sidemenu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="modal" class="fixed z-20 w-full h-full top-0 right-0 bg-black bg-opacity-40 md:hidden" 
      [ngClass]="open ? 'block' : 'hidden'">            
      <div id="modal_content" class="w-fit max-w-[60%] h-full  border bg-blue-300 opacity-100">  
          <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: ``
})
export class SidemenuComponent {
  @Input() id: string = 'lgModal' // for multiple observables
  open:boolean = false
  modal!: HTMLElement

  constructor(private el: ElementRef<HTMLElement>, private sidemenu: SidemenuService){
    this.sidemenu.onToggle().subscribe(toggle => {
      if (toggle.parentID === this.id) {
        this.open = toggle.open
        this.modal = this.el.nativeElement.querySelector('#modal') || new HTMLElement
      }        
    })    
  }

  ngOnInit(){
    window.addEventListener('click', (event: any) => {
      if (event.target === this.modal) this.sidemenu.close(this.id) 
    })
  }
}
