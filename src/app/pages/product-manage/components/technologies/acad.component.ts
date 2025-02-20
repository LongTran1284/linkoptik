import { Component } from '@angular/core';
import { InfoCardComponent } from '../info-card.component';
import { TextPipe } from '../../../../pipes/text.pipe';

@Component({
  selector: 'app-acad',
  standalone: true,
  imports: [InfoCardComponent, TextPipe],
  template: `
    <info-card title="ACAD và cách xử lý" [lastOne]="true">
      <p class="h4">ACAD là gì?</p>
      <p [innerHTML]="acad[0] | text:'style(*;b i)':'list(;2)':'link(Airy Disk; blue i )'"></p>
      <img src="/assets/technology/acad_1.png" alt="acad_1" class="mx-auto my-5">
      <p class="my-2">{{acad[1]}}</p>
      <img src="/assets/technology/acad_2.png" alt="acad_2" class="mx-auto my-5">
      <p class="my-2">{{acad[2]}}</p>

      <p class="h4 mt-5 mb-3">Cách xử lý hiện tượng ACAD</p>
      <p [innerHTML]="acad[3] | text:'list(;2)'"></p>
      <img src="/assets/technology/analysis_mode.png" alt="analysis_mode" class="mx-auto my-5">          
      <p [innerHTML]="acad[4] | text:'bold':'list(diamond;2)'" 
      class="h6 italic border border-slate-700 text-slate-600 p-1 my-2 mx-auto rounded-lg w-full lg:w-[1050px]"></p>
      <p [innerHTML]="acad[5] | text:'bold':'list(;2)'"></p>
    </info-card>
  `,
  styles: ``
})
export class AcadComponent {
  acad: string[] = [
    `Trước khi tìm hiểu về ACAD, chúng ta cần tìm hiểu khái niệm "$./cong-nghe/airy-disk$" ở trên. Theo đó, lý thuyết *"kích thước hạt càng nhỏ thì góc tán xạ càng lớn"* chỉ đúng khi các hạt có khả năng hấp thụ hoặc các hạt trong suốt, nhưng sự thay đổi kích thước hạt đủ lớn.
    Với các hạt trong suốt, góc tán xạ đôi khi sẽ giảm khi kích thước hạt giảm (chứ không tăng như lý thuyết), hiện tượng này gọi là *ACAD (Abnormal Change of Airy Disk)*
    Ví dụ hình bên dưới, chỉ số khúc xạ RI=1.2, kích thước hạt tăng dần 2.87, 3.49, 4.55, 5.31 và 6.03 #um, nhưng góc tán xạ lần lượt là 8.09°, 13.06°, 6.91°, 5.08°, và 7.90°
    `,
    `Hoặc khi thay đổi RI=1.1 thì kích thước hạt tăng dần 5.91, 6.82, 9.09, 10.91 và 11.8 với các góc tán xạ lần lượt là 4.24°, 
    7.02°, 3.49°, 2.61° và 4.35°`,
    `Chúng ta có thể thấy ở cả 2 trường hợp thì hạt có kích thước nhỏ nhất không có góc tán xạ lớn nhất và hạt có kích thước lớn nhất không có góc tán xạ nhỏ nhất`,
    `Một số hãng sẽ yêu cầu người sử dụng lựa chọn chế độ đo “single peak narrow distribution” để cho kết quả có vẻ đúng. Nếu không, thiết bị sẽ cho ra kết quả hoàn toàn sai.
    Ví dụ như hình bên dưới là ứng dụng của một hãng TQ có 3 chế độ đo và "R-R" là chế độ đo được nhắc đến ở trên.
    `,
    `*R-R:* It is a single peak and smooth distribution mode, and pre-provisioning distribution model. If the first two modes cannot get the satisfactory result, maybe can try this kind of modes.
    `,
    `Một số hãng khác sẽ xử lý bằng cách thêm một giá trị về độ hấp thụ của mẫu. Mặc dù phương pháp này giúp các kết quả đo được ổn định, tuy nhiên nó vẫn sai lệch so với giá trị thực.
    Với Linkoptik, sau khi tìm hiểu kỹ cơ chế và quy luật của ACAD, các nhà khoa học của Linkoptik đã tìm ra được cốt lõi của hiện tượng này và giải quyết thành công ảnh hưởng của nó bằng cách cải thiện thuật toán đảo ngược.
    *Thuật toán đảo ngược* là một trong những công nghệ quan trọng của máy đo kích thước hạt và là sự khác biệt của Linkoptik so với một số hãng khác. Theo đó, Linkoptik không "bắt" người dùng phải phân vân lựa chọn các chế độ đo (như hình trên) và luôn cho ra kết quả chính xác, đáng tin cậy
    `
    ]
  
}
