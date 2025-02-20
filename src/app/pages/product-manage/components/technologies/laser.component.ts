import { Component } from '@angular/core';
import { InfoCardComponent } from '../info-card.component';
import { TextPipe } from '../../../../pipes/text.pipe';

@Component({
  selector: 'app-Laser',
  standalone: true,
  imports: [InfoCardComponent, TextPipe],
  template: `
    <info-card [title]="title">
      <h4 class="h4 my-5">Tia Laser là gì?</h4>
      <p [innerHTML]="content[0] | text:'bold':'list(;2)'"></p>
      <img src="/assets/technology/laser.png" alt="laser" class="mx-auto my-5">
      <h4 class="h4 my-5">Cấu tạo của đèn Laser</h4>
      <p [innerHTML]="content[1] | text:'bold':'list(;2)'"></p>
      <img src="/assets/technology/laser_components.png" alt="laser_components" class="mx-auto my-5">

      <h4 class="h4 my-5">Các loại đèn Laser</h4>
      <p [innerHTML]="content[2] | text:'bold':'list(;2)'"></p>
      <img src="/assets/technology/laser_solid.png" alt="laser_solid" class="mx-auto my-5">
      <p [innerHTML]="content[3] | text:'bold':'list(;2)'"></p>
      <p [innerHTML]="content[4] | text:'bold':'list(;2)'"></p>
      <img src="/assets/technology/laser_air.png" alt="laser_air" class="mx-auto my-5">
      <p [innerHTML]="content[5] | text:'bold':'list(;2)'"></p>
      <img src="/assets/technology/laser_semiconductor.png" alt="laser_semiconductor" class="mx-auto my-5">

      <h4 class="h4 my-5">Đèn Laser trên máy Linkoptik</h4>
      <p [innerHTML]="content[6] | text:'list(;2)'"></p>
      <p [innerHTML]="content[7] | text:'list(diamond;2 blue)'"></p>
      <p [innerHTML]="content[8] | text:'list(square2;2 red)'"></p>
    </info-card>
  `,
  styles: ``
})
export class LaserComponent {
  title: string = `Tìm hiểu về đèn laser`
  content: string[] = [`
    Theo Wikipedia, Laser (*L*ight *A*mplification by *S*timulated *E*mission of *R*adiation): được hiểu là sự khuếch đại ánh sáng bằng bức xạ kích thích.
    Tia laser là một nguồn ánh sáng nhân tạo thu được nhờ vào sự khuếch đại ánh sáng bằng bức xạ phát ra trong điều kiện kích hoạt cao độ các phần tử của môi trường vật chất.
  `,
  `
    Đèn laser hay thiết bị phát ra tia laser tiêu chuẩn sẽ có cấu tạo gồm 3 bộ phận cơ bản:
    *1/ Vật liệu laser hoặc môi trường hoạt chất:* Là môi trường để các hoạt chất được kích thích bởi các nguồn năng lượng bên ngoài nhằm tạo ra sự đảo ngược dòng điện chuyển động electron. Trong môi trường khuếch đại, sự phát xạ tự phát và kích thích của các hạt lượng tử photon diễn ra, dẫn đến hiện tượng khuếch đại quang học. Chất bán dẫn, thuốc nhuộm hữu cơ, khí, vật liệu rắn thường được sử dụng làm vật liệu phát quang.
    Môi trường hoạt chất quyết định đến bước sóng và các tính chất khác của tia laser phát ra.
    *2/ Nguồn năng lượng bên ngoài (ánh sáng, điện):* là một nguồn năng lượng đủ lớn nhằm cung cấp tác động đến các hạt điện tích trong môi trường hoạt chất và phát xạ để kích thích vào hệ thống.
    *3/ Buồng cộng hưởng quang:* Chứa gương phản xạ và bán phản xạ ở 2 đầu làm cho các hạt photon va chạm liên tục vào hoạt chất nhiều lần tạo ra mật độ hạt photon lớn.
  `,
  `
    *1/ Laser rắn:* Hiện nay có khoảng 200 chất rắn có thể làm môi trường hoạt chất laser, ví dụ như: vật liệu thủy tinh, thủy tinh thể,... Loại laser có ứng dụng cao phổ biến hiện nay và được tìm ra đầu tiên là laser ruby. 
  `,
  `
    *2/ Laser lỏng:* chất lỏng mà được sử dụng làm môi trường hoạt chất được gọi là laser lỏng. Laser xung nhuộm là ví dụ cơ bản cho loại laser này, chúng sử dụng thuốc nhuộm hữu cơ để làm môi trường hoạt chất. 
  `,
  `
    *3/ Laser khí:* loại laser trong đó dòng điện được phóng qua trong một môi trường chất khí được sử dụng làm môi trường hoạt chất thì được gọi là laser khí. Đây là loại laser được ứng dụng trong trường hợp đòi hỏi ánh sáng laser có độ kết dính và chùm sáng cao.
  `,
  `
    *4/ Laser bán dẫn:* hay còn gọi là laser diot và đóng vai trò quan trọng trong cuộc sống như: đọc đĩa Compact, máy in laser, làm bút chỉ bảng , máy chống trộm,...
    Loại laser này khác với laser bán dẫn ở chỗ laser rắn sử dụng năng lượng ánh sáng làm nguồn bơm còn laser bán dẫn sử dụng nguồn điện làm nguồn bơm. Hiện này, laser bán dẫn có chi phí rẻ, kích thước nhỏ gọn và tiêu thụ năng lượng thấp.
  `,
  `
    Máy đo kích thước hạt của Linkoptik sử dụng đèn laser thể rắn tích hợp hệ thống ổn định nhiệt độ tự động, với rất nhiều ưu điểm như:     
  `,
  `
    Có công suất đầu ra cao và hiệu suất chuyển đổi năng lượng cao.
    Chất lượng chùm tia tuyệt vời, đảm bảo chùm tia chuẩn trực và tập trung chặt chẽ, rất quan trọng cho các ứng dụng đòi hỏi độ chính xác cao.
    Thời gian hoạt động dài, giảm chi phí bảo trì và thay thế.
    Kích thước nhỏ gọn, bền bỉ trước các điều kiện môi trường, đảm bảo hiệu suất đáng tin cậy.   
  `,
  ` Nhược điểm duy nhất của đèn laser thể rắn đó là chi phí sản xuất cao.`
  ]
}
