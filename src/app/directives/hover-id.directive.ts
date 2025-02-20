import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[hoverId]',
  standalone: true
})
export class HoverIdDirective {
  /* Used for result-item: change id text color when hover item */ 
  
  @Input()
  set hoverId({itemRef, idRef}: {itemRef: HTMLElement, idRef: HTMLElement}){    
    itemRef.addEventListener('mouseover', (event) => idRef.style.setProperty('color', 'white'))
    itemRef.addEventListener('mouseleave', (event) => idRef.style.setProperty('color', 'rgb(30 41 59)'))  // slate-800
  }
}
