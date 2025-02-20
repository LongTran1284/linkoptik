import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LgInput, LgIcon } from 'lg-components';
import { FocusSearchDirective } from '../directives/focus-search.directive';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'search',
  standalone: true,
  imports: [CommonModule, LgInput, LgIcon, FormsModule, FocusSearchDirective],
  template: `      
    <div class="relative" [focusSearch]="{input: searchbox, selectbox: searchOption}">
      <input #searchbox type="text" class="searchInput" placeholder="Search..."
        [(ngModel)]="value" (keydown.enter)="onSearch()">
      <div class="searchIcon" (click)="onSearch()"><lg-icon name="magnifying-glass"></lg-icon></div>

      <select #searchOption
        class="searchOption" 
        [(ngModel)]="searchBy"
        (ngModelChange)="onSearch()"
      >              
        <option *ngFor="let item of searchList" value="{{item.key}}">{{item.value}}</option>
      </select>
    </div>
  `,
  styles: ``
})
export class SearchComponent {
  @Output() search_event = new EventEmitter()
  value: string = ''
  user!: string
  
  searchList: any[] = [
    {key: 'showAll', value: 'Show All'},
    {key: 'byName', value: 'By Name'},
    {key: 'byApplication', value: 'By Application'},
    {key: 'byModel', value: 'By Model'},
    {key: 'byDate', value: 'By Date'}
  ]
  
  searchBy: string = this.searchList[1].key

  constructor(private route: ActivatedRoute){
    // this.route.data.subscribe(role => {this.user = role['role']})
    this.route.parent?.data.subscribe(role => {this.user = role['role']})
  }

  ngOnInit(){
    if (this.user === 'user') {
      this.searchList = [...[{key: 'check', value: 'Check existing'}], ...this.searchList]
    }
    else if (this.user === 'admin') {
      this.searchList.push({key: 'bySeller', value: 'By Seller'})
    }   
  }

  onSearch(){
    this.search_event.emit([this.value.toLowerCase(), this.searchBy])
  }
}
