import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[dropshow]',
  standalone: true
})
export class DropshowDirective {

  @Input()
  set dropshow({dropRef, dropdown, show, x=-12, y=16}: {dropRef: HTMLElement, dropdown: HTMLElement, show: boolean, x?:number, y?:number}){
    // dropdown.style.setProperty('transform', `translate(${x}px, ${y}px)`)

    dropRef.addEventListener('mouseover', (event) => dropdown.style.setProperty('visibility', 'visible'))
    dropRef.addEventListener('mouseleave', (event) => dropdown.style.setProperty('visibility', 'hidden'))
    // dropRef.addEventListener('mouseover', (event) => {show = true; console.log(dropdown.classList)})
    // dropRef.addEventListener('mouseleave', (event) => show = false)
    
  }

}
