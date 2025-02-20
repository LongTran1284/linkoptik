import { Component } from '@angular/core';
import { InfoCardComponent } from '../info-card.component';
import { TextPipe } from '../../../../pipes/text.pipe';
import { LgIcon } from 'lg-components';

@Component({
  selector: 'app-introduce',
  standalone: true,
  imports: [InfoCardComponent, TextPipe, LgIcon],
  template: `
    <info-card title="Ý nghĩa của sự phân bố kích thước hạt">
      <p [innerHTML]="intro[0] | text:'list(;2)'"></p>
      <div class="flex gap-3 justify-center my-5">
        <div class="border border-blue-600 text-blue-600 rounded-lg w-[45px] h-[45px] text-[40px] flex justify-center items-center">
        <lg-icon name="circle-info"></lg-icon>
        </div>
        <p [innerHTML]="particle_note | text:'list(;2)'" class="border border-blue-600 px-5 py-2 rounded-lg "></p>
      </div>
      <p [innerHTML]="intro[1] | text:'list(;2)'"></p>
    </info-card>
  `,
  styles: ``
})
export class IntroduceComponent {
  intro: string[] = [`
  Bột là tập hợp của nhiều hạt có kích thước khác nhau. Vì nguyên liệu dạng bột rất tốt cho việc sản xuất, bảo quản và sử dụng nên bột là một hình thức sản xuất, vận chuyển và sử dụng nguyên liệu quan trọng và cũng là dạng nguyên liệu được tiếp xúc thường xuyên nhất trong đời sống hàng ngày của chúng ta.
  Vật liệu bột được sử dụng rộng rãi trong luyện kim, khoáng sản, năng lượng, hóa chất, vật liệu xây dựng, y học, thông tin, thực phẩm, gốm sứ và các ngành công nghiệp khác. Đặc biệt với cuộc cách mạng thông tin và sự phát triển của các nguồn năng lượng mới, nhu cầu sử dụng nguyên liệu bột đã tăng lên một tầm cao mới.
  Các tính chất vật lý và hóa học quan trọng nhất của vật liệu bột là sự phân bố kích thước hạt của chúng, bởi vì sự phân bố kích thước hạt quyết định diện tích tiếp xúc bề mặt, hoạt động và tính chất lưu động của bột. Đồng thời, sự phân bố kích thước hạt có ảnh hưởng lớn đến các tính chất của bột như độ phân tán, độ khuấy, độ đồng nhất và độ dốc của hạt bột. Do đó, việc đo kích thước hạt của bột và kiểm soát kích thước hạt là cách duy nhất để ngành công nghiệp bột phát triển sâu rộng.
  `,
  `Máy phân tích kích thước hạt là một thiết bị được sử dụng để kiểm tra kích thước và sự phân bố của các hạt trong mẫu bột. Có nhiều loại máy phân tích kích thước hạt khác nhau tùy theo nguyên lý, điều kiện sử dụng và tính chất của mẫu được kiểm tra.
  Máy phân tích kích thước hạt nhiễu xạ laser là một thiết bị tính toán phân bố kích thước hạt bằng cách đo sự phân bố cường độ ánh sáng tán xạ ở các góc khác nhau. Trong một chùm tia laser có bước sóng xác định, các hạt có kích thước khác nhau sẽ tạo ra sự phân bố tán xạ khác nhau. Bằng cách đo sự phân bố cường độ của ánh sáng tán xạ ở các góc khác nhau, có thể tính được kích thước và sự phân bố của các hạt trong hạt bột.
  Máy phân tích kích thước hạt có nhiều ưu điểm như dải đo rộng với giới hạn dưới nhỏ và giới hạn trên lớn, nhiều chế độ cấp liệu tùy chọn khác nhau và phù hợp với nhiều môi trường khác nhau. Do đó, máy phân tích kích thước hạt nhiễu xạ laser hiện là thiết bị được sử dụng phổ biến nhất và phù hợp nhất để đo kích thước hạt của hầu hết các loại bột.
  `
  ]

  particle_note: string =`Bột không chỉ đề cập đến vật liệu bột khô. 
  Huyền phù, nhũ tương, chất keo, thành phần keo tụ, sol khí và thậm chí cả tạp chất trong chất lỏng và khí cũng là đối tượng của phép đo bột.`
}
