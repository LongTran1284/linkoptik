import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarLibComponent, navProp } from '../libraries/navbar-lib.component';
import { LgIcon } from 'lg-components';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LgIcon, NavbarLibComponent],
  template: `
    <navbar-lib [items]="nav_items"></navbar-lib>
    
  `,
  styles: ``
})
export class NavbarComponent {
  nav_items: navProp[] = [
    {link: 'about', text: 'About Us', 
      // dropdownList: [
      //   {link: './about', queryParams: {sec: 'hienlong'}, text: 'Hien Long'},
      //   {link: './about', queryParams: {sec: 'linkoptik'},text: 'Linkoptik'},
      // ]
    },
    {link: 'products', text: 'Products', 
      dropdownList: [
        {link: './products/may-do-kich-thuoc-hat/lt2200', text: 'LSPA LT2200 Series'},
        {link: './products/may-do-kich-thuoc-hat/lt3600', text: 'LSPA LT3600 Series'},
      ]
    },
    {link: 'cong-nghe', text: 'Technology',
      dropdownList: [
        {link: './cong-nghe/', text: 'Ý nghĩa của sự phân bố kích thước hạt'},
        {link: './cong-nghe/airy-disk', text: 'Airy Disk'},
        {link: './cong-nghe/acad', text: 'ACAD và cách xử lý'},
        {link: './cong-nghe/filter', text: 'Bộ lọc sợi phân cực'},
        {link: './cong-nghe/trapezoidal-window', text: 'Cửa sổ hình thang nghiêng và cảm biến dò góc siêu lớn'},
        {link: './cong-nghe/laser', text: 'Đèn Laser'},
      ]
    },
    {link: 'contact', text: 'Contact Us',
      // dropdownList: [
      //   {link: './contact', queryParams: {sec: 'contact'}, text: 'Thông tin liên hệ'},
      //   {link: './contact', queryParams: {sec: 'quote'},text: 'Yêu cầu báo giá'},
      // ]
    },    
  ]
}
