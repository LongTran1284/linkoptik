import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TextPipe } from '../../pipes/text.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TextPipe, CommonModule],
  template: `
    <div class=" px-3 grid gap-3 h-[85vh] md:px-0 md:gap-0 md:grid-cols-[150px_auto] md:h-[78vh] ">     
      <div class="h-fit lg:h-full pt-2 rounded-lg">
        <h3 class="h3 bg-blue-700 text-white rounded-t-lg px-3 py-2 md:text-center ">Tìm hiểu về:</h3>
        <div class="h4 bg-cyan-200 text-cyan-700 rounded-b-lg flex items-center justify-around md:flex-col md:justify-center md:gap-2 md:py-2">
          <h4 class="py-2 md:py-0 hover:underline cursor-pointer" (click)="goToElement('hienlong')">Hiển Long</h4>
          <h4 class="py-2 md:py-0 hover:underline cursor-pointer" (click)="goToElement('linkoptik')">Linkoptik</h4>
        </div>
        
      </div> 
      <div class=" md:px-3 py-2 overflow-y-auto " #about>
        <div class="border border-cyan-500 p-3 rounded-lg shadow-sm mb-10" id="hienlong">
          <div class="bg-cyan-100 border-b border-cyan-500 px-5 py-3 -mx-3 -mt-3 rounded-t-lg">
            <p class="h3 text-cyan-700">Công ty CP Công nghệ Hiển Long</p>
          </div>  
          <div class="h5 mt-2">
            <p [innerHTML]="hienlong | text:'style(italic bold #e11d48)':'list(;3)' "></p>
            <div class="flex justify-center my-5">
              <img src="/assets/hienlong_staff.png" alt="hienlong_staff">
            </div>
            <div [ngClass]="{'mb-3': j===0}" *ngFor="let ad of address; index as j">
              <p [innerHTML]="ad.title | text:'style(b u)':'list(square1; purple)'"></p>
              <ng-container *ngFor="let d of ad.content">
                <div class="grid grid-cols-[48px_auto] md:grid-cols-[54px_auto]">
                  <p>{{d.name}}</p>
                  <p>{{d.text}}</p>
                </div>
              </ng-container>          
            </div>            
          </div>          
        </div>

        <div class="border border-cyan-500 p-3 rounded-lg shadow-sm " id="linkoptik">
          <div class="bg-cyan-100 border-b border-cyan-500 px-5 py-3 -mx-3 -mt-3 rounded-t-lg">
            <p class="h3 text-cyan-700">Linkoptik Instruments</p>
          </div>  
          <div class="h5 mt-2">
            <p [innerHTML]="linkoptik | text:'style(italic bold #e11d48)':'list(;2)':'link(Tiến sĩ Zhang; blue i)' "></p>
            <div class="flex justify-center my-5">
              <img src="/assets/linkoptik_office.jpg" alt="linkoptik_office">
            </div>
            <p [innerHTML]="'*Giới thiệu về tiến sĩ Zhang Fugen:*' | text:'style(b u)':'list(square1; purple)'" 
              id="zhang"></p>          
            <p [innerHTML]="zhang | text:'list(;2)'"></p>
            <p [innerHTML]="'*Kinh nghiệm chính:*' | text:'bold'" class="mt-3"></p>
            <p [innerHTML]="experience | text:'list(diamond;2)':'style(b i)'"></p>
          </div>          
        </div>        
      </div>
    </div>    
  `,
  styles: ``
})
export class AboutComponent {
  hienlong: string = `
  *Hiển Long* là một công ty phân phối và cung cấp dịch vụ hàng đầu trong lĩnh vực thiết bị và công cụ. 
  Công ty chuyên cung cấp các thiết bị và công cụ chất lượng cao phục vụ cho nhiều ngành công nghiệp và ứng dụng khác nhau. 
  Tại *Hiển Long*, khách hàng có thể tìm thấy các thiết bị hiệu suất cao được thiết kế để đáp ứng nhu cầu và yêu cầu cụ thể của họ. Đội ngũ giàu kinh nghiệm và am hiểu của công ty làm việc chặt chẽ với khách hàng để cung cấp lời khuyên và hướng dẫn chuyên nghiệp, đảm bảo rằng khách hàng tìm thấy sản phẩm phù hợp với nhu cầu của họ. 
  Ngoài việc phân phối thiết bị và công cụ, *Hiển Long* còn cung cấp dịch vụ và hỗ trợ đáng tin cậy. Các kỹ thuật viên được đào tạo cao cấp của công ty được trang bị các công cụ và kỹ thuật mới nhất, giúp họ nhanh chóng chẩn đoán và giải quyết bất kỳ vấn đề nào mà khách hàng có thể gặp phải với thiết bị của họ. Cho dù bạn đang tìm kiếm các công nghệ mới nhất hay cần thay thế linh kiện hoặc dịch vụ bảo trì, *Hiển Long* có kiến thức và tài nguyên để hỗ trợ bạn. 
  Vì vậy, nếu bạn muốn làm việc với một công ty cung cấp thiết bị, công cụ và dịch vụ chất lượng hàng đầu, hãy chọn *Hiển Long*. Các thiết bị và công cụ mà chúng tôi cung cấp được sử dụng rộng rãi trong các lĩnh vực như phòng thí nghiệm, sản xuất như dược phẩm, thực phẩm, đóng gói, sơn, lớp phủ, mỹ phẩm, điện tử, nông nghiệp, đồ uống, và nhiều lĩnh vực khác.
  `

  address: any[] = [
    {
      title: '*Trụ sở chính ở TP.HCM:*',
      content: [
        {name: 'Địa chỉ:', text: '126 No. 2 Street, Tan Phong-Kim Son Residential, Tan Phong Ward, District 7, Ho Chi Minh City, Vietnam.'},
        {name: 'Phone:', text: '(+84) 28 6262 2862'},
        {name: 'Email:', text: 'info@hiltekvn.com'}
      ]
    },
    {
      title: '*Văn phòng đại diện tại Hà Nội:*',
      content: [
        {name: 'Địa chỉ:', text: 'Room 504A Machinco 1 Building, No. 10 Tran Phu St. Mo Lao Ward, Ha Dong Dist., Ha Noi City, Viet Nam.'},
        {name: 'Phone:', text: '(+84) 24 6285 3033 '},
        {name: 'Email:', text: 'saleshn@hiltekvn.com'}
      ]
    }
  ]

  linkoptik: string = `   
  *Linkoptik* là công ty hàng đầu về đặc tính hạt. 
  Kể từ khi $./about?sec=zhang$, người sáng lập công ty, phát triển máy đo kích thước hạt nhiễu xạ laser thương mại đầu tiên ở Trung Quốc vào những năm 1990, nhóm nghiên cứu đã dẫn đầu lĩnh vực định cỡ hạt nhiễu xạ laser ở Trung Quốc. 
  Với danh mục công nghệ được cấp bằng sáng chế ngày càng tăng và kiến thức ứng dụng công nghiệp sâu rộng, *Linkoptik* giúp khách hàng hiểu rõ hơn về nhiều loại vật liệu, từ dược phẩm đến hóa chất và polyme, từ huyền phù hạt vi mô và hạt nano cũng như nhũ tương, cho đến thuốc xịt và bình xịt. 
  Điều quan trọng là kiến thức chuyên môn về ứng dụng mà chúng tôi tích lũy được luôn sẵn có cho mọi khách hàng và giúp khách hàng đạt được lợi thế cạnh tranh của mình.
  `
  zhang: string = `  
  Zhang Fugen, sinh năm 1962, theo học liên tiếp tại Đại học Chiết Giang, Đại học Nankai và Đại học Thiên Tân và nhận bằng cử nhân, thạc sĩ và tiến sĩ. 
  Năm 1989, ông tốt nghiệp Đại học Thiên Tân và trở thành giáo sư kỹ thuật quang học tại Khoa Dụng cụ Chính xác. 
  Năm 1991, ông từ chức và chuyển đến Đặc khu kinh tế Chu Hải. Hai năm sau, ông thành lập Công ty Omec.
  `
  experience: string = `
  Năm 1990, ông tham gia nghiên cứu máy quang phổ nhỏ giọt laser, phát triển thương mại và dịch vụ hậu mãi.
  Năm 1993, ông thành lập Công ty TNHH Omec Instrument tại Đặc khu kinh tế Chu Hải. Ông là nhà thiết kế chính và là người đứng đầu thương mại hóa dòng Omec LS, dòng PIP, dòng RC, máy phân tích kích thước hạt ES. Ông đã cho ra mắt máy phân tích kích thước hạt nhiễu xạ laser thương mại đầu tiên, máy phân tích hình ảnh hạt đầu tiên cũng như máy đếm hạt Kurt đầu tiên.
  Năm 1998, ông được bầu làm Phó Chủ tịch CPPCC, quận Tương Châu, thành phố Chu Hải.
  Năm 1999, ông biên soạn lý thuyết cơ bản về đo kích thước hạt và các tài liệu nghiên cứu được phân phối nội bộ. Nó đã được tái bản bốn lần.
  Năm 2001, công ty đổi tên thành "Zhuhai Omec Technology Co.,ltd.".
  Năm 2002, giai đoạn 1 Khu Công viên Khoa học Công nghệ hoàn thành và đưa vào sử dụng. Cùng năm đó, anh đã giành được Giải thưởng Hạt Trẻ thứ hai của Hiệp hội Hạt học Trung Quốc.
  Năm 2006, ông được bầu làm phó chủ tịch Hiệp hội Hạt học Trung Quốc.
  *Năm 2010, ông tách hoạt động kinh doanh thiết bị khỏi Omec Technology và thành lập "Zhuhai Omec Technology Co.,ltd.". Ông đã chuyển nhượng cổ phiếu của công ty này cho một công ty ở Anh. (Malvern - một công ty rất nổi tiếng về máy đo kích thước hạt)*
  Năm 2011, ông được Đại học Thiên Tân tuyển dụng làm giáo sư thỉnh giảng để hướng dẫn các nghiên cứu sinh sau đại học thực hiện nghiên cứu cơ bản về lý thuyết tán xạ ánh sáng.
  Năm 2014, ông được bầu làm chủ tịch của Hiệp hội Tiến sĩ Chu Hải.
  Năm 2015, ông làm việc cho Zhuhai Linkoptik Co., Ltd. và cống hiến hết mình cho việc thương mại hóa các sản phẩm phân tích hạt.
  `

  @ViewChild('about') aboutRef!: ElementRef<HTMLElement>

  constructor(private activeRoute: ActivatedRoute, private router: Router, private location: Location) { }

  // ngOnInit(){this.onResize()}

  ngAfterViewInit(): void {
    this.activeRoute.queryParams.subscribe(param => {
      if (param['sec']){
        const section = this.aboutRef.nativeElement.querySelector(`#${param['sec']}`)
        section?.scrollIntoView()
      }
    })
  }

  goToElement(el: string){    
    const element = document.getElementById(el); 
    if (element) { element.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    
    this.location.replaceState('./about') // rewrite the url without reloading page
  }

}
