import { Component, ElementRef, ViewChild } from '@angular/core';
import { TextPipe } from '../../pipes/text.pipe';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LgInput, LgPassword, LgPhone, LgTextArea } from 'lg-components';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { contact_info } from '../../shared/commonValues';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    TextPipe, 
    LgInput, LgPassword, LgTextArea, LgPhone,
    FormsModule, ReactiveFormsModule
  ],
  template: `
    <div class=" px-3 grid gap-3 h-[85vh] md:px-0 md:gap-0 md:grid-cols-[230px_auto] md:h-[78vh] ">     
      <div class="h-fit lg:h-full pt-2 ">
        <!-- <h3 class="h3 bg-blue-700 text-white rounded-t-lg px-3 py-2 md:text-center ">Tìm hiểu về:</h3> -->
        <div class="rounded-lg overflow-hidden h4 bg-cyan-200 text-cyan-700  flex items-center justify-around md:flex-col md:justify-center md:gap-2 md:py-2">
          <h4 class="py-2 md:py-0 hover:underline cursor-pointer" (click)="goToElement('contact')">Thông tin liên hệ</h4>
          <h4 class="py-2 md:py-0 hover:underline cursor-pointer" (click)="goToElement('quote')">Yêu cầu báo giá</h4>
          <div class="mt-3 -mb-2 hidden md:block">
            <img src="/assets/HL_building.jpg" alt="HL_building">
          </div>
          
        </div>
        
      </div> 
      <div class=" md:px-3 py-2 overflow-y-auto " #contact>
        <div class="border border-cyan-500 py-3 rounded-lg shadow-sm mb-10" id="contact">
          <div class="bg-cyan-100 border-b border-cyan-500 px-5 py-3  -mt-3 rounded-t-lg">
            <p class="h3 text-cyan-700">Thông tin liên hệ</p>
          </div>  
          <div class=" mt-3 mx-1 flex justify-center">            
            <div class="grid md:grid-cols-[150px_auto] h-fit md:rounded-lg md:border md:border-blue-500 w-fit overflow-hidden md:bg-blue-200 relative">            
              <div></div>
              <div class="ml-0 md:ml-3 lg:ml-5 max-w-full md:max-w-[350px] flex justify-center flex-col">
                <p class="text-base md:text-lg text-rose-500 font-bold">{{contact_info.company}}</p>
                <p class="text-sm md:text-base text-blue-500">{{contact_info.address}}</p>
                <p [innerHTML]="contact_info.contact | text:'list'" class="text-sm md:text-base text-slate-500"></p>
              </div>
              <div class="w-[150px] h-[220px] overflow-hidden border-r-4 border-r-blue-500/[0.55] rounded-e-full bg-white absolute top-0 hidden md:block">
                <img src="/assets/Long.jpg" alt="my_photo" class="w-full h-full object-contain">
              </div>
            </div>              
          </div>          
        </div>

        <div class="border border-cyan-500 p-3 rounded-lg shadow-sm " id="quote">
          <div class="bg-cyan-100 border-b border-cyan-500 px-5 py-3 -mx-3 -mt-3 rounded-t-lg">
            <p class="h3 text-cyan-700">Yêu cầu báo giá</p>
          </div>  
          <div class="h5 mt-2">
            <form [formGroup]="contactForm" (ngSubmit)="$event.preventDefault(); submitForm()" 
            class="grid  md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div class="row-start-1"><lg-input 
                label="Tên người yêu cầu" icon="contact"
                [required]="true" controlKey="senderName"
              ></lg-input></div>

              <div class="md:col-span-2"><lg-input 
                label="Tên doanh nghiệp" controlKey="senderCompany"
              ></lg-input></div>

              <div class=""><lg-phone 
                label="Số điện thoại"
                [required]="true" controlKey="senderPhone"
              ></lg-phone></div>

              <div class=""><lg-input 
                label="Email" icon="email"
                [required]="true" controlKey="senderEmail"
              ></lg-input></div>

              <div class="md:row-start-1 lg:row-start-2 lg:col-start-3"><lg-input 
                label="Bộ phận" controlKey="senderDept"
              ></lg-input></div>
              
              <div class="md:col-span-2"><lg-textarea 
                label="Nội dung yêu cầu"  [minlength]="10"
                [required]="true" controlKey="senderMessage"
              ></lg-textarea></div>

              <div>
              <button type="submit" class="btn w-fit submit" [disabled]="contactForm.invalid">Send Request</button> 
              </div>
            </form>
          </div>          
        </div>        
      </div>
    </div>    
  `,
  styles: ``
})
export class ContactComponent {

  // contact_info: any = {
  //   company: 'CÔNG TY CP CÔNG NGHỆ HIỂN LONG',
  //   address: `126 đường số 2, KDC Tân Phong - Kim Sơn, Nguyễn Hữu Thọ,
  //   P. Tân Phong, Q7, TPHCM.`,
  //   contact:     
  //   `Trần Đình Long
  //   Mr. Long Tran
  //   Mobile: 0908.064.835 (Whatsapp, Wechat, Zalo)
  //   Email: long.tran@hiltekvn.com
  //   Email: long.td.sales@gmail.com
  //   `}

  contact_info: any = contact_info
  contactForm = new FormGroup({})

  @ViewChild('contact') contactRef!: ElementRef<HTMLElement>
  constructor(private activeRoute: ActivatedRoute, private location: Location){}

  ngAfterViewInit(): void {
    this.activeRoute.queryParams.subscribe(param => {
      if (param['sec']){
        const section = this.contactRef.nativeElement.querySelector(`#${param['sec']}`)
        section?.scrollIntoView()
      }
    })
  }

  goToElement(el: string){    
    const element = document.getElementById(el); 
    if (element) { element.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    
    this.location.replaceState('./about') // rewrite the url without reloading page
  }

  submitForm(){

  }
}
