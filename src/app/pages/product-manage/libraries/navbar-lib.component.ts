import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DropshowDirective } from '../directives/dropshow.directive';
import { LgIcon } from 'lg-components';
import { SidemenuComponent } from './sidemenu.component';
import { SidemenuService } from './sidemenu.service';

export interface navProp {
  // type: string, 
  link: string, text: string,
  dropdownList?: any,
  queryParams?: any,
}

@Component({
  selector: 'navbar-lib',
  standalone: true,
  imports: [
    CommonModule, RouterModule, DropshowDirective, LgIcon, 
    SidemenuComponent
  ],
  template: `
    <nav class="nav-wrapper h-[60px] hidden md:block">
      <div class="nav-container ">
        <ng-container *ngFor="let item of items; index as j" >
          @if (item.dropdownList && item.dropdownList.length) {
            <div class="flex items-center h-full relative">
              <div id="{{j}}" class="dropRef nav-item pe-[30px]" >
                <a routerLink="{{item.link}}">{{item.text}}</a> 
                <div class="dropdown" [ngClass]="showdrop_list[j]? 'visible':'invisible'">
                  <a *ngFor="let x of item.dropdownList" 
                    class="dropdown-item" routerLink="{{x.link}}" [queryParams]="x.queryParams"
                  >{{x.text}}</a> 
                </div>
              </div>
                                           
              <div id="icon" (click)="this.showdrop_list[j] = !this.showdrop_list[j]" 
                class="rounded-full w-[25px] h-[25px] flex items-center justify-center absolute right-0"
                [ngClass]="showdrop_list[j]? 'bg-emerald-700':'bg-emerald-500'">
                <lg-icon name="angle-down"></lg-icon>
              </div>
            </div>            
            
            <!-- <div class="flex items-center h-full  relative">
              <div id="{{j}}" class="dropRef nav-item " >
                <a routerLink="{{item.link}}">{{item.text}}</a> 
                <div class="dropdown" [ngClass]="showdrop_list[j]? 'visible':'invisible'">
                  <a *ngFor="let x of item.dropdownList" 
                    class="dropdown-item" routerLink="{{x.link}}" [queryParams]="x.queryParams"
                  >{{x.text}}</a> 
                </div>
              </div>
                                           
              <div id="icon" (click)="this.showdrop_list[j] = !this.showdrop_list[j]" 
                class="rounded-full w-[25px] h-[25px] flex items-center justify-center"
                [ngClass]="showdrop_list[j]? 'bg-emerald-700':'bg-emerald-500'">
                <lg-icon name="angle-down"></lg-icon>
              </div>
            </div>             -->
          }
          @else {<div class="nav-item"><a routerLink="{{item.link}}">{{item.text}}</a></div>}
        </ng-container>              
      </div>     
    </nav>
    <nav class="nav-wrapper h-[30px] block md:hidden">
      <div  class="nav-container">
        <div (click)="openMenu()"><lg-icon name="bars"></lg-icon></div>        
      </div>      
    </nav>

    <sidemenu id="menu">
      <div class="mt-[85px] px-3 text-sm" > 
        <ng-container *ngFor="let item of items; index as j" >
          @if (item.dropdownList && item.dropdownList.length) {             
            <div >
              <div class="active:bg-blue-600 flex justify-between mb-2" (click)="navigateTo(item.link)">
                <span >{{item.text}}</span>                
                <span ><lg-icon name="angle-down"></lg-icon></span>
              </div>

              <div class="ml-2">
                <div *ngFor="let x of item.dropdownList" (click)="navigateTo(x.link, x.queryParams)"
                  class="active:bg-blue-600  mb-2" 
                >{{x.text}}</div> 
              </div>
            </div>
            <hr *ngIf="j<items.length-1" class="my-2">
          }
          @else {
            <div class="active:bg-blue-600 mb-2" (click)="navigateTo(item.link)">
              {{item.text}}
            </div>
            <hr *ngIf="j<items.length-1" class="my-2">
          }             
        </ng-container>
      </div>
    </sidemenu>  

  `,
  styles: ``
})
export class NavbarLibComponent {
  @Input() items: navProp[] = []
  showdrop_list:boolean[] = []
  
  constructor(private router: Router, private sidemenu: SidemenuService, private el: ElementRef<HTMLElement>){
    this.items.forEach(item => this.showdrop_list.push(false))    
  }
  
  ngAfterViewInit(){
    const dropRef = this.el.nativeElement.querySelectorAll('.dropRef') 
    const iconRef = this.el.nativeElement.querySelectorAll('#icon') 
    
    Array.from(dropRef).map((ref, id) => {
      ref.addEventListener('mouseover', (event) => this.showdrop_list[+ref.id] = true)
      ref.addEventListener('mouseleave', (event) => this.showdrop_list[+ref.id] = false)
      ref.addEventListener('click', (event) => this.showdrop_list[+ref.id] = false)
      iconRef[id].addEventListener('mouseleave', (event) => this.showdrop_list[+ref.id] = false)
    })
  }
  
  openMenu(){    
    this.sidemenu.open('menu')
  }

  navigateTo(url: string, q?:any){
    this.router.navigate([url], {queryParams: q})
    this.sidemenu.close('menu')
  }

}
