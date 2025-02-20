import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listText',
  standalone: true
})
export class ListTextPipe implements PipeTransform {
    /*
    <p class="m-5 " [innerHTML]="introduce | listText:'number:/':'md 3'"></p>
    <p class="m-5 " [innerHTML]="introduce | listText:'*':'md'"></p> 

    ❖ : '&#10070;':'blue-500 md'
    ➤ : '&#10148;':'md blue-500'
    ⁜ : &#8284;
    ※ : &#8251;
    */ 
  // transform(value: string, type: string = '*', symbolSize: string = 'xl', mb: string='0'): string {    
  transform(value: string, type: string = '', ...args: string[]): string {    
    let symbolSize = 'md'; let mb = '0'; let symbolColor: string = ''
    if (args.length) {
      args[0].split(' ').filter(x=>x).forEach(arg => {
        arg = arg.trim()
        if (['xs', 'sm', 'md', 'xl', '4xl'].includes(arg)) symbolSize = arg
        else if (['0', '1', '2', '3'].includes(arg)) mb = arg
        else symbolColor = `text-${arg}`
      })
    }
    // console.log(symbolSize, mb)
    let val = value.split('\n')
    let formatText: string = ''
    let symbol: string = ''


    let sth = type.split(':')[1]
    if (!type.includes('number')) symbol = type
    else {
      type = 'number'
      if (sth === undefined) sth = '.'      
    }
    let id:number = 1
    val.forEach((txt) => {      
      if (txt.trim() !== '') {        
        if (type === 'number') {symbol = `${id}${sth}`; id ++}        
        formatText += `
          <div class="mb-${mb} flex items-start">            
            <span class="mr-2 text-${symbolSize} ${symbolColor}">${symbol}</span>
            <span>&nbsp;</span>
            <span>${txt}</span>
          </div>
        `
      }      
      
    })
    
    return formatText
  }

}
