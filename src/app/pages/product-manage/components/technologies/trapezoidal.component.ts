import { Component } from '@angular/core';
import { InfoCardComponent } from '../info-card.component';
import { TextPipe } from '../../../../pipes/text.pipe';

@Component({
  selector: 'app-trapezoidal',
  standalone: true,
  imports: [InfoCardComponent, TextPipe],
  template: `
    <info-card [title]="title">
      <p [innerHTML]="content[0] | text:'list(;2)'"></p>
      <img src="/assets/technology/critical_angle.png" alt="critical_angle" class="mx-auto my-5">
      <p [innerHTML]="content[1] | text:'list(;2)'"></p>
      <img src="/assets/technology/dual_beam_light_path.png" alt="dual_beam_light_path" class="mx-auto my-5">
      <p [innerHTML]="content[2] | text:'style(*;b i)':'list(;2)'"></p>
      <img src="/assets/technology/tilted_trapzoidal_window.png" alt="tilted_trapzoidal_window" class="mx-auto my-5">
    </info-card>
  `,
  styles: ``
})
export class TrapezoidalComponent {
  title: string = `Cửa sổ hình thang nghiêng và cảm biến dò góc siêu lớn (Linkoptik patent number: 2017201957847)`
  content: string[] = [`
  Hiện nay, cell đo của hầu hết các máy phân tích kích thước hạt hiện có đều bao gồm hai tấm kính phẳng và các kết cấu cơ khí hỗ trợ chúng. Kính vuông góc với trục quang của hệ thống và các hạt cần kiểm tra nằm trong cell đo. 
  Chắc chắn rằng chiết suất của môi trường lỏng (gọi là “môi trường phân tán”) dùng để phân tán các hạt cần kiểm tra luôn lớn hơn chiết suất của không khí, trong khi các cảm biến dò (bao gồm cảm biến chính và cảm biến góc lớn) được đặt trong không khí, ánh sáng tán xạ cần được phát hiện, chạy từ chất lỏng qua kính vào không khí. 
  Như hình bên dưới, khi góc tán xạ tương đối nhỏ, ánh sáng tán xạ có thể phát ra từ mặt kính phía trước của cell đo. Tuy nhiên, khi góc của ánh sáng tán xạ tăng thì góc tới của ánh sáng tán xạ tới kính trước của cell đo cũng tăng, khi góc tán xạ lớn hơn một giá trị tới hạn nhất định (gọi là “góc tới hạn”, ví dụ: môi trường nước, góc tới hạn là 48,75^o), ánh sáng tán xạ sẽ bị phản xạ toàn phần tại mặt phân cách kính - khí, tức là ánh sáng tán xạ sẽ không đi vào không khí và sẽ không được thiết bị phát hiện. 
  Thực tế góc tán xạ tối đa mà cảm biến dò có thể nhận được là khoảng 45^o. Lúc này, hạn chế về phản xạ toàn phần khiến giới hạn ngưỡng đo dưới thực tế của máy phân tích kích thước hạt chỉ đạt khoảng 0,3#um.  
  `,
  `
  Một số hãng sẽ sử dụng 2 hoặc thậm chí 3 nguồn sáng khác nhau. Như hình bên dưới là sơ đồ của một thiết bị có hai chùm tia chiếu sáng. Một tia chiếu vuông góc với cell đo, được gọi là “chùm tia chính”, hoạt động giống như nguồn sáng của thiết bị thông thường, và tia còn lại chiếu nghiêng từ kính phía sau vào cell đo, được gọi là “chùm tia phụ”. 
  Giả sử góc truyền của chùm tia phụ trong môi trường phân tán là 30^o, khi các hạt được chiếu sáng bởi chùm tia phụ tạo ra ánh sáng tán xạ với góc 70^o, góc tới của chùm tia tán xạ tới kính trước là 40^o (=70-30), nhỏ hơn góc tới hạn và có thể phát ra từ cửa sổ trước của cell đo. Ánh sáng tán xạ của các góc siêu lớn còn lại có thể suy ra bằng cách tương tự. Phương pháp này có thể mở rộng hiệu quả phạm vi góc nhận được của ánh sáng tán xạ. 
  Nhược điểm của phương pháp là đòi hỏi phải có hai nguồn sáng và kết cấu phức tạp. Vấn đề lớn hơn là dữ liệu về ánh sáng tán xạ tạo ra bởi chùm tia chính và chùm tia phụ thường ít hơn lý tưởng. Khi đỉnh chính của sự phân bố ánh sáng tán xạ của các hạt đo được ở điểm giao nhau, kích thước và sự phân bố hạt thường không được đo chính xác. 
  `,
  `Dòng máy đo kích thước hạt LT3600 series sử dụng một công nghệ đã được cấp bằng sáng chế của Linkoptik là *cửa sổ hình thang nghiêng và cảm biến dò góc siêu lớn dạng lưới (Linkoptik patent number: 2017201957847)* 
  Độ dốc hình thang giải quyết hiệu quả hạn chế phản xạ toàn phần đối với ánh sáng tán xạ góc siêu lớn (góc tán xạ lớn hơn góc tới hạn của cửa sổ truyền thống), trong khi thiết bị tách sóng quang học góc siêu lớn dạng lưới giải quyết vấn đề đầu ra song song và nghiêng của cửa sổ hình thang. Qua đó mở rộng phạm vi góc tán xạ có thể phát hiện được trong môi trường phân tán lên gần 90^o, so với hệ 1 chùm tia truyền thống, góc tán xạ có thể đo được tăng gấp đôi; còn so với hệ đa chùm tia, phạm vi góc tán xạ kém hơn nhưng tránh được vấn đề về sự khác biệt dữ liệu ở đường nối giữa các chùm tia. 
  `
  ]
}
