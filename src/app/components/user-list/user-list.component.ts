import { Component, HostListener } from '@angular/core';
// import { AdminDashboardComponent } from '../../components/admin-dashboard.component';
import { SearchComponent } from '../search.component';
import { UsertItemComponent } from './user-item.component';
import { BottomComponent } from '../bottom.component';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { LgIcon, LgModal, LgModalService, optionItem } from 'lg-components';
import { UserClass, UserInterface } from '../../shared/user-interface';
import { UserDetailComponent } from '../details/user-detail.component';
import { CustomerClass } from '../../shared/customer-interface';
import { Router, RouterModule } from '@angular/router';
import { CreateAccountComponent } from '../../pages/user-manage/create-account.component';
import { companyGroup } from '../../shared/commonValues';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule, SearchComponent, LgIcon, LgModal,
    RouterModule,
    UsertItemComponent, BottomComponent, UserDetailComponent, CreateAccountComponent
  ],
  template: `
    
    <h1 class="text-center text-blue-500 text-lg sm:text-xl md:text-2xl font-bold my-5">USER LIST</h1>
  
    <!-- <div class="mx-5 mb-5 flex justify-center ">
      <div class=" w-full md:w-9/12 ">
        <search (search_event)="onSearch($event)"></search>
      </div>    
    </div> -->

    <div class="mx-auto w-10/12 md:w-1/2">      
      <div class="flex justify-between mb-5">
        <div class="font-bold">Total Users: {{all_user.length}}</div>
        <div class="text-blue-500 cursor-pointer hover:underline hover:italic" (click)="createUser()">Create New User</div>
      </div>

      <div *ngFor="let group of userGroup; index as j"
      class="border shadow-lg rounded-lg p-0 mb-3"
      >      
        <div class="bg-slate-300 relative px-2 py-1 rounded-lg" 
          [ngClass]="{'rounded-b-none': showList[j]}"
          (click)="showList[j] = !showList[j]"
        >
          {{group.key}} ({{group.value.length}})
          <div class="absolute right-2 top-1 text-slate-500">
            <div [ngClass]="{'hidden': showList[j]}"><lg-icon name="angle-down"></lg-icon></div>
            <div [ngClass]="{'hidden': !showList[j]}"><lg-icon name="angle-up"></lg-icon></div>            
          </div>          
        </div>
        @if (group.value.length){
          <div *ngFor="let item of group.value; index as i" 
          class="px-4 py-1 border-t  border-slate-300 text-slate-400 hover:text-black hover:shadow" 
          [ngClass]="{'hidden': !showList[j]}" 
          (click)="openUserDetail(item, group.id_list[i])" 
        >
          {{i+1}}. {{ item.nickName? item.nickName : item.userName }}
        </div>
        } @else {
          <div class="px-4 py-1 border-t italic border-slate-300 text-slate-400" 
          [ngClass]="{'hidden': !showList[j]}" 
        >
          There's no user... 
          <span class="hover:underline hover:text-blue-500 cursor-pointer" (click)="createUser(group.key)">Create one?</span>
          <!-- (click)="createUser()" [routerLink]="['/','create-account']" -->
        </div>
        }         
      </div>
    </div>
      
    
    <div>
      <lg-modal id="userDetailVip" [static]="true" [style]="{'width': screen_width < 700 ? '100%' :'400px'}"
        title="User Details" [titleStyle]="{'color':'rgb(59 130 246)'}"
      >
        <user-detail (edit_user)="editUser($event)"></user-detail>
      </lg-modal>

      <lg-modal id="createUser" [static]="true" 
        [style]="{'width': screen_width < 700 ? '100%' :(screen_width < 1000 ? '75%' :'50%')}"        
      >
        <create-account [openByModal]="true" [selectedCompany]="selectedCompany"></create-account>
      </lg-modal>
    </div>
    <app-bottom></app-bottom>
  `,
  styles: ``
})
export class UserListComponent {

  all_cus: any = []
  all_user: any = []

  showList: boolean[] = [false, false, false, false, false]
  screen_width: number = 0
  selectedCompany!: optionItem

  userGroup: any[] = [
    {key: 'Other', value: [], id_list: []}, 
    {key: 'Hiển Long SG', value: [], id_list: []}, 
    {key: 'Hiển Long HN', value: [], id_list: []}, 
    {key: 'Rồng Tiến', value: [], id_list: []}, 
    {key: 'Phú Bảo Long', value: [], id_list: []}
  ]

  get ref(){
    let alist: any = {}
    this.userGroup.map((item: any, id: number) => {
      alist[item.key] = id
    })
    return alist
  }

  @HostListener('window:resize', ['$event']) onResize(){
    this.screen_width = window.screen.availWidth    
  }

  constructor(
    private eventService: EventService, 
    private modalSerice: LgModalService,
    // private router: Router
  ){
    this.onResize()
    this.eventService.listen('userList', (data: any) => {
      this.all_cus = data.all_cus 
      this.all_user = data.all_user      
      this._getUserGroup()      
    })
  
  }

  _getUserGroup(){
    // refresh userGroup before adding values
    this.userGroup.forEach(item => {item.value = []; item.id_list = []})
    // add values to userGroup
    this.all_user.map((user: UserClass, id: number) => {       
      let num: number
      if (!user.company || user.company === 'a') num = 0
      else num = this.ref[user.company]
      this.userGroup[num].value.push(user); this.userGroup[num].id_list.push(id)
    })
  }

  openUserDetail(user_data: UserClass, id: number){
    this.modalSerice.open('userDetailVip')
    this.eventService.emitt('userDetail', {
      user: user_data,
      all_user: this.all_user,
      all_cus: this.all_cus,
      id: id,
      cus: this._extractCusByUser(user_data)
    })    
  }

  _extractCusByUser(user_data: UserClass){
    let cus: CustomerClass[] = []
    const user: string = user_data.nickName? user_data.nickName.toLowerCase() : ''
    this.all_cus.forEach((item: CustomerClass) => {
      if (item.seller.toLowerCase() === user) cus.push(item)
    })
    return cus
  }

  editUser(event: any){
    this.all_user = event.all_user
    this._getUserGroup()
  }


  createUser(com?: string){
    // console.log(com)
    if (com){
      // let comOptions!: optionItem
      companyGroup.forEach(item => {
        if (item.value === com) this.selectedCompany = item.key
      })
      // console.log(comOptions)
    }
    this.eventService.emitt('createUserByCompany', this.selectedCompany)
    this.modalSerice.open('createUser')
  }

}
