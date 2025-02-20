import { Component } from '@angular/core';
import { InfoCardComponent } from '../info-card.component';
import { TextPipe } from '../../../../pipes/text.pipe';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [InfoCardComponent, TextPipe],
  template: `
    <info-card [title]="title" [lastOne]="true">      
      <p [innerHTML]="filter[0] | text:'bold':'list(;2)'"></p>
      <div class="lg:flex my-5">
        <img src="/assets/technology/laser_mode.png" alt="laser_mode" class="mx-auto">
        <img src="/assets/technology/gaussian_mode.png" alt="gaussian_mode" class="mx-auto">
      </div>
      <p [innerHTML]="filter[1] | text:'bold':'list(;2)'"></p>
      <img src="/assets/technology/pinhole_filter.png" alt="pinhole_filter" class="mx-auto mt-5 mb-8">
      <p [innerHTML]="filter[2] | text:'bold':'list(;2)'"></p>
      <img src="/assets/3600/LT3600_diagram.png" alt="LT3600_diagram" class="mx-auto">
      
    </info-card>
  `,
  styles: ``
})
export class FilterComponent {
  title: string ="Bộ lọc sợi phân cực - Polarization Fiber Filter (Linkoptik patent number: 2017101156275)"
  filter: string[] = [`
  Chùm tia laser sẽ có nhiều sự phân bố cường độ khác nhau (còn gọi là laser đa mode). 
  Trong kỹ thuật nhiễu xạ laser, để phép đo có độ chính xác, yêu cầu chùm tia laser khi chiếu vào cell đo, phải là chùm tia laser đơn mode thuần khiết, chỉ có 1 sự phân bố cường độ duy nhất, ở đó năng lượng ánh sáng tập trung ở phần lõi hay được gọi là chùm tia Gaussian lý tưởng.
  `,
  `Trên thị trường máy đo kích thước hạt bằng nhiễu xạ laser hiện nay, chủ yếu sử dụng 2 giải pháp:
  *1/ Sử dụng kính lọc lỗ kim (pinhole):* đây là cách phổ biến nhất. Hiệu ứng lọc tốt nhưng nó dễ bị rung động cơ học và gây ra sự dịch chuyển trong suốt quá trình vận chuyển máy, thậm chí chỉ di chuyển trong phạm vi ngắn. Sự dịch chuyển dù chỉ vài micron cũng đủ khiến cho chùm tia bị biến dạng.
  Việc điều chỉnh lại vị trí của pinhole cần thực hiện bởi chuyên gia, điều này gây bất tiện cho người dùng.
  `,
  `*2/ Bộ lọc phân cực:* đây là công nghệ đã được cấp bằng sáng chế của Linkoptik. Bộ lọc giúp cho chùm tia vừa thuần khiết vừa ổn định, không bị ảnh hưởng bởi quá trình vận chuyển máy.`
  ]
}
