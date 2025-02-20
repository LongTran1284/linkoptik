import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'symbol',
  standalone: true
})
export class FormatSymbolPipe implements PipeTransform {

  transform(value: string): string {
    const data: any = {
      'oC': '&#8451;',
      'oF': '&#8457;',
      '+-': '&plusmn;',
      '>=': '&#8805;',
      '<=': '&#8804;',
      '#um': '&#181;m'
    }
    Object.keys(data).forEach(key => {
      value = value.replaceAll(key, data[key])  
    })
    
    return value;
  }

}
