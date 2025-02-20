import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'styleText',
  standalone: true
})
export class StyleTextPipe implements PipeTransform {

  /*
  <p class="mt-3" [innerHTML]="introduce | styleText:brand+',*':'red, italic, bold' | safeHtml"></p>
  to set style into innerHTML, should use safeHTML Pipe
  if donot want to use safeHTML Pipe, should apply class instead
  */ 

  constructor(private sanitized: DomSanitizer) {  }

  transform(value: string, ...args: string[]) {
    // console.log(args) // ['Linkoptik,*', 'red, italic, bold']
    if (args.length !== 2) {
      console.error(`It should be "styleText : text : style"`)
      return value
    }

    let [styleWhat, styleCondition] = args
    let myStyle: string = ''
    styleCondition.split(' ').filter(x => x).forEach(arg => {      
      if (arg.trim() === 'bold') myStyle += 'font-weight: bold; '
      else if (arg.trim() === 'italic') myStyle += 'font-style: italic; '
      else myStyle += `color: ${arg}; `
    })

    // console.log(myStyle)
    const regex = new RegExp(/([*])(?:(?=(\\?))\2.)*?\1/g, 'gi');
    const colorMe = (txt: string) => {
      if (txt.trim() === '*') 
        value = value.replace(regex, (match) => `<span style="${myStyle}">${match.replace(/\*/g,'')}</span>`);
      else        
        value = value.replaceAll(txt, (match) =>  `<span style="${myStyle}"> ${match}</span>`)          
    }

    if (styleWhat.includes(',')){ // bold multiple text      
      const styleList: string[] = styleWhat.split(',')
      styleList.forEach(txt => colorMe(txt))
    }
    else colorMe(styleWhat)

    // return value
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

}
