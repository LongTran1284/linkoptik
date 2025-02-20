import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'text',
  standalone: true
})

export class TextPipe implements PipeTransform {
  /*
  <p [innerHTML]="introduce | text:'style(*; bold red italic underline)':'list(diamond; blue md 3):'link((xem them))''"></p>
  <p [innerHTML]="introduce | text:'style(b i u red)':'list(diamond; blue md 3)':'link((xem them); *style)'"></p>
  
  * the color does not contain spaces in text: rgb(168,85,247) is OK, not rgb(168, 85, 247)

  * style can be written in short term but only 1 condition: text:'bold' or text:'italic' or text:'color-red'...
  for multiple condition: text:'style(bold italic underline red)' or 'style(b i u red)'

  * format symbol is the default function, no need to assign it
  "introduce | text" => format symbol only

  *link style: as default is text blue and underline
  link in text will be: $https://www.linkoptik.com/english/productshow_59.html$

  */ 

  symbolData: any = { // used for format symbol
    'oC': '&#8451;',
    'oF': '&#8457;',
    '+-': '&plusmn;',
    '>=': '&#8805;',
    '<=': '&#8804;',
    '#um': '&#181;m',
    '^o': '&#176;'
  }

  favSymbols: any = { // used for list text
    'none': '',
    'diamond': '&#10070;', // ❖ 
    'arrow': '&#10148;',  // ➤
    'square1': '&#8284;', // ⁜ 
    'square2': '&#8251;'  // ※ 
  }

  font_size: any = {
    'xs': '0.75rem', /* 12px */
    'sm': '0.875rem', /* 14px */
    'md': '1rem', /* 16px */
    'lg': '1.125rem', /* 18px */
    'xl': '1.25rem', /* 20px */
    '2xl': '1.5rem', /* 24px */
    '3xl': '1.875rem', /* 30px */
    '4xl': '2.25rem', /* 36px */
    '5xl': '3rem', /* 48px */
    '6xl': '3.75rem', /* 60px */
    '7xl': '4.5rem', /* 72px */
    '8xl': '6rem', /* 96px */
    '9xl': '8rem', /* 128px */
  }
  margin_bottom: any = {
    '0': '0px', 
    '1': '0.25rem', 
    '2': '0.5rem', 
    '3': '0.75rem',    
  }

  constructor(private sanitized: DomSanitizer) {}

  _createFontStyle(args: string[]){
    let myStyle: string = ''
    args.forEach(arg => {  
      arg = arg.trim()    
      if (arg === 'bold' || arg === 'b') myStyle += 'font-weight: bold; '
      else if (arg === 'italic' || arg === 'i') myStyle += 'font-style: italic; '
      else if (arg === 'underline' || arg === 'u') myStyle += 'text-decoration-line: underline; '
      else myStyle += `color: ${arg}; `
    })
    return myStyle
  }

  styleText(value: string, args: string[]){
    let [styleWhat, styleCondition] = args
    if (args.length === 1) {styleWhat = '*'; styleCondition = args[0]}

    let myStyle: string = this._createFontStyle(styleCondition.split(' ').filter(x => x))
    const regex = new RegExp(/([*])(?:(?=(\\?))\2.)*?\1/g, 'gi');
    const colorMe = (txt: string) => {
      txt = txt.trim()      
      if (txt === '*') 
        value = value.replace(regex, (match) => `<span style="${myStyle}">${match.replace(/\*/g,'')}</span>`);
      else if (txt === 'all')       
        value = `<span style="${myStyle}"> ${value}</span>`
      else if (txt !== '')       
        value = value.replaceAll(txt, (match) =>  `<span style="${myStyle}"> ${match}</span>`)          
    }
    
    styleWhat.split(',').filter(x => x).forEach(txt => colorMe(txt))
    
    return value
  }

  symbolText(value: string){
    Object.keys(this.symbolData).forEach(key => value = value.replaceAll(key, this.symbolData[key]))    
    return value;
  }

  listText(value: string, args: string[]=[]){
    let [type, condition] = args
    // handle symbol type    
    if (Object.keys(this.favSymbols).includes(type)) type = this.favSymbols[type]

    // handle condition: symbol size, symbol color and margin-bottom    
    const display: any = {
      'outside': 'display: flex; align-items: flex-start;',
      'inside': ''
    }
    let symbolSize = 'md'; let symbolColor: string = ''; let mb = '0'; let dp: string = 'outside'
    if (condition){
      condition.split(' ').filter(x=>x).forEach(arg => {
        arg = arg.trim()
        if (Object.keys(this.font_size).includes(arg)) symbolSize = arg
        else if (Object.keys(this.margin_bottom).includes(arg)) mb = arg
        else if (['outside', 'inside'].includes(arg)) dp = arg
        else symbolColor = arg         // `text-${arg}`
      })
    }
    let symbolStyle: string = type==='' ? 'display: none;' : 
    `margin-right: 0.5rem; font-size: ${this.font_size[symbolSize]}; color: ${symbolColor};`
    let divStyle: string = `margin-bottom: ${this.margin_bottom[mb]}; ${display[dp]}`
    
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
          <div style="${divStyle}">            
            <span style="${symbolStyle}">${symbol}&nbsp;</span>
            <span>${txt}</span>
          </div>
        `
      }            
    })    
    return formatText
  }

  linkText(value: string, args: string[]=[]){
    let name: string = 'xem them'; let styleCondition: string = 'u rgb(29,78,216)'
    if (args.length === 1) {name = args[0] }
    else if (args.length === 2) {[name, styleCondition] = args }
    let linkStyle: string = this._createFontStyle(styleCondition.split(' ').filter(x => x))

    const regex = new RegExp(/([$])(?:(?=(\\?))\2.)*?\1/g, 'gi');    
    value = value.replace(regex, (match) => 
      `<a style="${linkStyle}" href="${match.replace(/\$/g,'')}" >${name}</a>`);
    return value
  }

  linkTextOpenTab(value: string, args: string[]=[]){
    let name: string = 'xem them'; let styleCondition: string = 'u rgb(29,78,216)'
    if (args.length === 1) {name = args[0] }
    else if (args.length === 2) {[name, styleCondition] = args }
    let linkStyle: string = this._createFontStyle(styleCondition.split(' ').filter(x => x))

    const regex = new RegExp(/([$])(?:(?=(\\?))\2.)*?\1/g, 'gi');    
    value = value.replace(regex, (match) => 
      `<a style="${linkStyle}" href="${match.replace(/\$/g,'')}" target="_blank">${name}</a>`);
    return value
  }

  _handleTask(value: string, args: string[]){
    /* there are 4 tasks:
    - style: bold color italic underline
    - symbol: convert to specific symbols
    - list: convert a string to a list of text
    - link: convert an url in string to an internal link
    */
    args.forEach(arg => {
      let task = arg.split('(')[0]
      let action = arg.substring(
        arg.indexOf("(") + 1, 
        arg.lastIndexOf(")")
      );   
      
      if (task ==='style') value = this.styleText(value, action.split(';'))
      else if (task ==='bold') value = this.styleText(value, ['*', 'bold'])
      else if (task ==='italic') value = this.styleText(value, ['*', 'italic'])
      else if (task ==='underline') value = this.styleText(value, ['*', 'underline'])
      else if (task.includes('color-')) value = this.styleText(value, ['*', task.replace('color-', '')])

      else if (task ==='link')value = this.linkText(value, action.split(';'))
      else if (task ==='linkTab')value = this.linkTextOpenTab(value, action.split(';'))
      else if (task ==='list') value = this.listText(value, action.split(';'))
    })
    value = this.symbolText(value) // always format symbols
    return value
  }

  transform(value: string, ...args: string[]) {
    if (args.length === 0) value = this._handleTask(value, ['symbol'])    
    else value = this._handleTask(value, args)
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

}
