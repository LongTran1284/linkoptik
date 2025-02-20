import { Component } from '@angular/core';
import { InfoCardComponent } from '../info-card.component';
import { TextPipe } from '../../../../pipes/text.pipe';

@Component({
  selector: 'app-airy-disk',
  standalone: true,
  imports: [InfoCardComponent, TextPipe],
  template: `
    <info-card title="Airy Disk" [lastOne]="true">
      <img src="/assets/technology/scattering_spot_pattern.png" alt="scattering_spot_pattern" class="mx-auto">
      <p [innerHTML]="airyDisk | text:'bold':'list(;2)'"></p>
    </info-card>
  `,
  styles: ``
})
export class AiryDiskComponent {
  airyDisk: string = `
  Hình trên là đồ thị phân bố cường độ ánh sáng tán xạ được tạo ra bởi hai hạt có kích thước khác nhau (hạt bên trái lớn hơn hạt bên phải). Có thể thấy, trường ánh sáng tán xạ bao gồm một điểm sáng hình tròn ở trung tâm và một loạt các vòng tròn xung quanh, có độ sáng giảm dần từ trong ra ngoài. Loại điểm sáng này gọi là “Airy Disk".
  Khoảng cách từ tâm điểm sáng trung tâm đến điểm tối thiểu thứ nhất được xác định là bán kính của điểm Airy.
  Góc giữa điểm sáng trung tâm với hạt tán xạ gọi là “góc tán xạ”.
  So sánh kích thước giữa 2 điểm Airy, có thể thấy *hạt có kích thước nhỏ hơn sẽ có điểm Airy lớn hơn, đó là do góc tán xạ lớn hơn.*
  Theo hiện tượng vật lý này, máy phân tích kích thước hạt tính toán sự phân bố kích thước của các hạt bằng cách phát hiện sự phân bố của trường ánh sáng tán xạ (xem thêm ISO 133201:1999, Particle size analysis laser diffraction methods Part 1 (1999)).
  `
}
