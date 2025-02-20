import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boldText',
  standalone: true
})
export class BoldTextPipe implements PipeTransform {
  /* <p class="mt-3" [innerHTML]="introduce | boldText:nsx + ',*' | listText"></p> 
      <p class="mt-3" [innerHTML]="introduce | boldText:'Bettersize, *'"></p> -->
  */ 

  transform(value: string, boldWhat: string = '*'): string {    
    const regex = new RegExp(/([*])(?:(?=(\\?))\2.)*?\1/g, 'gi');
    const boldMe = (txt: string) => {
      if (txt.trim() === '*') value = value.replace(regex, (match) => `<strong>${match.replace(/\*/g,'')}</strong>`);
      else value = value.replaceAll(txt, (match) => `<strong>${match}</strong>`);      
    }

    if (boldWhat.includes(',')){ // bold multiple text      
      const boldList: string[] = boldWhat.split(',')
      boldList.forEach(txt => boldMe(txt))
    }
    else boldMe(boldWhat)

    return value
  }

}
