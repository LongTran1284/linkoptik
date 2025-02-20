import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[preventKey]',
  standalone: true
})
export class PreventKeyDirective {
  /* prevent typing or deleting a key*/
  key: string = '-'

  @Input()
  set preventKey({el, id, key}:{el: HTMLInputElement, id?: number, key?: string}){
    if (id === 3) {      
      el.addEventListener('keydown', (event) => this.onKeyDown(event))
    }
  }

  onKeyDown(event: any){    
    if (event.key === 'Backspace') {
      const pos = event.target.selectionStart -1
      const val = event.target.value[pos]
      if (val && val === this.key) event.preventDefault()
    }
    else if (event.key === 'Delete') {
      const pos = event.target.selectionStart
      const val = event.target.value[pos]
      if (val && val === this.key) event.preventDefault()
    }
    else if (event.key === this.key) event.preventDefault()    
  }

}
