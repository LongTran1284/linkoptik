import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PhongItemComponent } from './phong-item';

@Component({
  selector: 'app-phong',
  standalone: true,
  imports: [PhongItemComponent],
  template: `
    <div class="m-[70px]">
      <div class="grid grid-cols-9 border-2 border-slate-300 rounded-lg shadow-lg">
        <div class="col-start-1 col-span-3 flex flex-col justify-center ml-5">
          <div>Note:</div>
          <div class="flex items-center">
            <div class="bg-red-300 w-[60px] h-[20px] mr-5"></div>
            <span>Phòng Master</span>
          </div>
          <div class="flex items-center">
            <div class="bg-lime-300 w-[60px] h-[20px] mr-5"></div>
            <span>Phòng Double</span>
          </div>
          <div class="flex items-center">
            <div class="bg-teal-200 w-[60px] h-[20px] mr-5"></div>
            <span>Phòng Double</span>
          </div>
          <div class="flex items-center">
            <div class="bg-slate-300 w-[60px] h-[20px] mr-5"></div>
            <span>Phòng Khách</span>
          </div>
        </div>

        <div class="col-start-6">
          <phong-item 
            [num]="14"
            [masterRoom]="vila14.master" 
            [doubleRoom1]="vila14.double1" 
            [doubleRoom2]="vila14.double2"
          ></phong-item>
        </div>
      </div>

      <div class="flex items-center justify-center h-10">
        <div>Đường rộng 13m</div>
      </div>
      
      <div class="grid grid-cols-9 border-2 border-slate-300 rounded-lg shadow-lg">
        <div class="col-start-2">
          <phong-item 
            [num]="43"
            [masterRoom]="vila43.master" 
            [doubleRoom1]="vila43.double1" 
            [doubleRoom2]="vila43.double2"
          ></phong-item>
        </div>

        <div class="col-start-4">
          <phong-item 
            [num]="40"
            [masterRoom]="vila40.master" 
            [doubleRoom1]="vila40.double1" 
            [doubleRoom2]="vila40.double2"
          ></phong-item>
        </div>
        
        <div class="col-start-8">
          <phong-item 
            [num]="24"
            [masterRoom]="vila24.master" 
            [doubleRoom1]="vila24.double1" 
            [doubleRoom2]="vila24.double2"
          ></phong-item>
        </div>

        <div class="col-start-9">
          <phong-item 
            [num]="23"
            [masterRoom]="vila23.master" 
            [doubleRoom1]="vila23.double1" 
            [doubleRoom2]="vila23.double2"
            [livingRoom]="vila23.living"
          ></phong-item>
        </div>
      </div>
    </div>
    
  `,
  styles: ``
})
export class PhongComponent {

  vila23: any = {
    master: ['Hoài + 2 con', 'Hằng + con'],
    double1: ['Dũng', 'A Hoa'],
    double2: ['Tiến', 'Vũ'],
    living: ['Long']
  }

  vila24: any = {
    master: ['GĐ A Hải + con'],
    double1: ['GĐ A Thiện'],
    double2: ['2 con A Thiện'],
  }

  vila40: any = {
    master: ['GĐ Dung + con'],
    double1: ['GĐ A Đức'],
    double2: ['2 con A Đức'],
  }

  vila43: any = {
    master: ['A Thắng + 2 con'],
    double1: ['Vợ A Thắng + con'],
    double2: ['Mr. Thắng - PBL', 'Thiện-PBL'],
  }
  
  vila14: any = {
    master: ['Liệp + 2 con', 'Trang + con'],
    double1: ['V.Anh', 'Hân'],
    double2: ['Hiền', 'Uyên'],
  }

}
