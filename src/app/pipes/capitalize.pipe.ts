import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cap',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {
  /* <h1>{{ title | cap:'each':'makeup' }}</h1> 
    <h1>{{ title | cap:'first' }}</h1>
  */ 

  transform(value: string, capWhat: string = 'first', makeup?: string): string {
    let rawStrList = value.split(' ').filter(n => n) // filter to remove empty elements in array
    let finalStrList: string[] = []
    rawStrList.map((str, id) => {
      if (capWhat === 'first') {
        if (id === 0) finalStrList.push([...str][0].toUpperCase() + str.slice(1))
        else finalStrList.push(str)
      }
      else finalStrList.push([...str][0].toUpperCase() + str.slice(1))
    })

    let capStr: string = ''
    if (makeup !== undefined) { //' hey , this    is : "big" title' => 'hey, this is: "big" title'
      finalStrList.map((str, id) => {
        let empty = ' '
        if (id === 0 || [',', '.', ';', ':'].includes(str)) empty = ''        
        capStr += `${empty}${str}`
      })
    } //' hey , this    is : "big" title' => 'hey , this is : "big" title'
    else capStr = finalStrList.join(' ')
    
    return capStr
  }

}
