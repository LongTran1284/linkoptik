import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[focusSearch]',
  standalone: true
})
export class FocusSearchDirective {
  /* Used for search component: change selectbox bg and text color when focus search input */ 
  
  isOption: boolean = false
  isInput: boolean = false

  @Input()
  set focusSearch({input, selectbox}: {input: HTMLElement, selectbox: HTMLElement}){    
    selectbox.style.setProperty('background-image', 'none')
    selectbox.addEventListener('mouseover', (event) => this.optionFocus())
    selectbox.addEventListener('blur', (event) => this.optionFocusOut(input, selectbox))

    input.addEventListener('focus', (event) => this.inputFocus(input, selectbox))
    input.addEventListener('blur', (event) => this.inputFocusOut(input, selectbox))      
  }

  inputFocus(input: HTMLElement, selectbox: HTMLElement){
    selectbox.style.setProperty('background-color', 'rgb(59 130 246)') // blue-500
    selectbox.style.setProperty('color', 'white')
    input.style.setProperty('border-color', 'rgb(59 130 246)') // blue-500
    this.isInput = true
  }

  inputFocusOut(input: HTMLElement, selectbox: HTMLElement){
    // console.log('option selected? ',this.isOption)
    if (this.isOption) {
        input.style.setProperty('border-color', 'rgb(59 130 246)') // blue-500        
    }
    else {
        selectbox.style.setProperty('background-color', 'rgb(209 213 219)') // gray-300
        selectbox.style.setProperty('color', 'black')
        input.style.setProperty('border-color', 'rgb(209 213 219)') // gray-300       
    }           
  }

  optionFocus(){
    this.isOption = true    
  }

  optionFocusOut(input: HTMLElement, selectbox: HTMLElement){
    this.isOption = false
    selectbox.style.setProperty('background-color', 'rgb(209 213 219)') // gray-300
    selectbox.style.setProperty('color', 'black')
    input.style.setProperty('border-color', 'rgb(209 213 219)') // gray-300    
  }
}
