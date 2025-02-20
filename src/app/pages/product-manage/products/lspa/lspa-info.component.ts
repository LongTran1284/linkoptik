import { ProductCard } from '../../interface/product-interface';


export const getFeatures = (series: string) => {
  return `
    Đáp ứng tiêu chuẩn ISO13320.
    Cải tiến thuật toán đảo ngược và kỹ thuật tự thích ứng với độ phân giải và độ nhạy cao.
    Tốc độ thu thập dữ liệu lên tới 20kHz.
    Nguồn sáng laser thể rắn với hệ thống ổn định nhiệt độ tự động. $./cong-nghe/laser$
    Sử dụng bộ lọc phân cực kết hợp với công nghệ sợi quang giúp tạo ra chùm tia laser sạch và ổn định, không bị ảnh hưởng bởi quá trình vận chuyển, di chuyển máy (Linkoptik patent number: 2017101156275). $./cong-nghe/filter$
    ${series.includes("3600") ? 
      "Cửa sổ hình thang nghiêng và cảm biến dò góc siêu lớn giúp mở rộng phạm vi đo lên đến 0.015 - 3600 #um (chỉ có trên LT3600 series). $./cong-nghe/trapezoidal-window$" : ""}    
    Hiệu chỉnh sự thay đổi dị thường của Airy Disk (ACAD). $./cong-nghe/acad$
  `
}

export const getSpecs = (series: string) => {
  let spec_list: string[] = []
  const specific: any = {
    'LT2200 Series' : {
      LT2200E : ['Khoảng đo: 0.1 - 1200 #um', 'Trọng lượng: 25kg'],
      LT2200 : ['Khoảng đo: 0.02 - 2200 #um', 'Trọng lượng: 26kg'],
      detector: 'Hệ thống dò tín hiệu: Mảng dò có độ nhạy cao dạng lưới, có khả năng bù diện tích, không có điểm chết.',
      cell: ''
    },
    'LT3600 Series' : {
      LT3600 : ['Khoảng đo: 0.02 - 3600 #um', 'Trọng lượng: 28kg'],
      LT3600Plus : ['Khoảng đo: 0.015 - 3600 #um', 'Trọng lượng: 28.5kg'],
      detector: 'Hệ thống dò tín hiệu: Mảng dò góc siêu rộng có độ nhạy cao dạng lưới, có khả năng bù diện tích, không có điểm chết.',
      cell: 'Cell đo với cửa sổ hình thang nghiêng giúp mở rộng phạm vi đo.'
    }
  }
  const spec: any = specific[series]
  Object.keys(spec).map((k, id) => {
    if (id <= 1)
    spec_list.push(
      ` ${spec[k][0]} 
        Độ lặp lại: < 0.5% (độ lệch của D50 trên mẫu chuẩn NIST Latex).
        Độ chính xác: < 0.6% (độ lệch của D50 trên mẫu chuẩn NIST Latex).
        Nguyên lý hoạt động: theo nguyên lý Mie.
        Nguồn laser: đèn laser thể rắn có tích hợp bộ điều chỉnh nhiệt, Max. 20mW, 638nm.
        Hệ điều hành máy vi tính: Win7/10.       
        ${spec.detector} 
        ${spec.cell}
        Hệ thống căn chỉnh quang học thông minh, căn chỉnh nhanh và hoàn toàn tự động.
        Bộ lọc phân cực trên sợi quang tạo ra chùm tia laser sạch và ổn định.
        Nguồn điện: 220V, 50/60 Hz.
        ${spec[k][1]}
      `      
    )
  })
  return spec_list
}

export const getIntroduce = (series: string) => {
  const myDict: any = {
    'LT2200 Series': ['cơ bản', 'LT2200E', '0.1 - 1200 #um', 'LT2200', '0.02 - 2200 #um'],
    'LT3600 Series': ['cao cấp', 'LT3600', '0.02 - 3600 #um', 'LT3600 Plus', '0.015 - 3600 #um']
  }
  const sth = myDict[series]
  return [
    `*${series}* là dòng máy đo kích thước hạt bằng laser ${sth[0]}, theo nguyên lý tán xạ ánh sáng Mie. 
      Máy có thiết kế dạng module với hai bộ phận đo và phân tán tách rời nhau, rất linh hoạt, dễ dàng chuyển đổi giữa các bộ phân tán khô và ướt, đáp ứng nhu cầu đo nhiều loại mẫu khác nhau.  
      *${series}* có 2 model là ${sth[1]} và ${sth[3]}.      
    `,
    ` Model *${sth[1]}* có phạm vi đo ${sth[2]}.
      Model *${sth[3]}* được trang bị thêm Backscatter detector giúp mở rộng phạm vi đo ${sth[4]}.
    `
    ]
}


export const getWetDisperser = (series: string): ProductCard[] => {
  let disperser = [
    {
      model: 'Hydrolink SE', 
      img: '/assets/dispersers/hydrolink_se.png',
      text: `
        Bộ phân tán lỏng tự động.
        Thể tích: tối đa 1000ml, tối thiểu 300ml (không dùng siêu âm) hoặc 450ml (dùng siêu âm).
        Tích hợp hệ thống siêu âm, đánh tơi mẫu.
        Tự động cân chỉnh mực nước, khử bọt nước, rửa cell đo.
        Kích thước: (WxDxH) 190 x 270 x 320 mm
        Trọng lượng: 9.5kg
      `
    },
    {
      model: 'Hydrolink', 
      img: '/assets/dispersers/hydrolink.png',
      text: `
        Bộ phân tán lỏng tự động.
        Thể tích: tối đa 1000ml, tối thiểu 300ml (không dùng siêu âm) hoặc 450ml (dùng siêu âm).
        Tích hợp hệ thống siêu âm, đánh tơi mẫu.
        Tự động cân chỉnh mực nước, khử bọt nước, rửa cell đo.
        Trang bị 2 motor riêng biệt điều khiển bơm và cánh khuấy.
        Kích thước: (WxDxH) 190 x 279 x 310 mm
        Trọng lượng: 10kg
        Thích hợp sử dụng cho các mẫu có độ phân bố kích thước hạt rộng như cát, bùn than...
      `
    },
    {
      model: 'Hydrolink SV', 
      img: '/assets/dispersers/hydrolink_sv.png',
      text: `
        Bộ phân tán lỏng bán tự động (bơm tuần hoàn và khuấy điều khiển bằng phần mềm hoặc nút bấm; cấp và xả nước thủ công).
        Thể tích: 50 - 120ml.
        Bể chứa làm bằng thép không rỉ, phù hợp với các dung môi ăn mòn.
        Tốc độ bơm/khuấy: 0-3000 vòng/phút.
        Hệ thống siêu âm không tích hợp sẵn, có thể lựa chọn thêm khi đặt hàng.
        Kích thước: (WxDxH) 130 x 275 x 320 mm
        Trọng lượng: 5.2kg
      `
    },  
  ]
  if (series.includes('3600')) disperser.shift()
  return disperser
}

export const lspa_products: ProductCard[] = [
  {
    model: 'LT2200 Series', 
    img: '/assets/2200/LT2200.png',
    // path: './linkoptik/products/may-do-kich-thuoc-hat/lt2200',
    path: 'lt2200',
    text: `
      LT2200E: 0.1 - 1200 #um
      LT2200: 0.02 - 2200 #um
      Đo cả 2 chế độ ướt và khô
    `
  },
  {
    model: 'LT3600 Series', 
    img: '/assets/3600/LT3600.png',
    // path: './linkoptik/products/may-do-kich-thuoc-hat/lt3600',
    path: 'lt3600',
    text: `
      LT3600: 0.02 - 3600 #um
      LT3600 Plus: 0.015 - 3600 #um
      Đo cả 2 chế độ ướt và khô
    `
  },  
]

// export const wet_disperser: ProductCard[] = [
//   {
//     model: 'Hydrolink SE', 
//     img: '/assets/dispersers/hydrolink_se.png',
//     text: `
//       Bộ phân tán lỏng tự động.
//       Thể tích: tối đa 1000ml, tối thiểu 300ml (không dùng siêu âm) hoặc 450ml (dùng siêu âm).
//       Tích hợp hệ thống siêu âm, đánh tơi mẫu.
//       Tự động cân chỉnh mực nước, khử bọt nước, rửa cell đo.
//       Kích thước: (WxDxH) 190 x 270 x 320 mm
//       Trọng lượng: 9.5kg
//     `
//   },
//   {
//     model: 'Hydrolink', 
//     img: '/assets/dispersers/hydrolink.png',
//     text: `
//       Bộ phân tán lỏng tự động.
//       Thể tích: tối đa 1000ml, tối thiểu 300ml (không dùng siêu âm) hoặc 450ml (dùng siêu âm).
//       Tích hợp hệ thống siêu âm, đánh tơi mẫu.
//       Tự động cân chỉnh mực nước, khử bọt nước, rửa cell đo.
//       Trang bị 2 motor riêng biệt điều khiển bơm và cánh khuấy.
//       Kích thước: (WxDxH) 190 x 279 x 310 mm
//       Trọng lượng: 10kg
//       Thích hợp sử dụng cho các mẫu có độ phân bố kích thước hạt rộng như cát, bùn than...
//     `
//   },
//   {
//     model: 'Hydrolink SV', 
//     img: '/assets/dispersers/hydrolink_sv.png',
//     text: `
//       Bộ phân tán lỏng bán tự động (bơm tuần hoàn và khuấy điều khiển bằng phần mềm hoặc nút bấm; cấp và xả nước thủ công).
//       Thể tích: 50 - 120ml.
//       Bể chứa làm bằng thép không rỉ, phù hợp với các dung môi ăn mòn.
//       Tốc độ bơm/khuấy: 0-3000 vòng/phút.
//       Hệ thống siêu âm không tích hợp sẵn, có thể lựa chọn thêm khi đặt hàng.
//       Kích thước: (WxDxH) 130 x 275 x 320 mm
//       Trọng lượng: 5.2kg
//     `
//   },

  
// ]

export const dry_disperser: ProductCard[] = [
  {
    model: 'Aerolink', 
    img: '/assets/dispersers/aerolink.png',
    text: `
      Điều khiển tự động áp suất không khí từ 0.5 - 4.5 bar, độ chính xác +-0.1bar.
      Lưu lượng nạp mẫu được điều khiển bằng phần mềm SOP.
      Mẫu được phân phối bằng ống venturi bằng thép không rỉ hoặc gốm. Loại ống bằng gốm dùng cho mẫu có tính ăn mòn.
      Kích thước: (WxDxH) 310 x 210 x 230 mm
      Trọng lượng: 15kg
      Cần trang bị thêm (không bao gồm) máy nén khí và máy hút chân không
    `
  },
]

// const lspa_accessories: ProductCard[] = [
//   {
//     model: 'Wet Measurement Cell', 
//     img: '/assets/accessories/wet_cell.jpg',
//     text: `
//       Cell đo phương pháp lỏng dùng cho LT2200 Series.
//       Thiết kế bao gồm 2 tấm kính tròn 2 bên và vòng đệm cao su O-ring.
//       Khi sử dụng dung môi có tính ăn mòn, cần sử dụng vòng đệm O-ring phù hợp.
//       Khi 2 tấm kính bị mờ hoặc xước, cần thay bộ mới để đảm bảo tính truyền quang.
//       Được cung cấp kèm theo 1 bộ khi mua bộ phân tán Hydrolink hoặc Hydrolink SE hoặc Hydrolink SV.
//     `
//   },
//   {
//     model: 'Wet Measurement Cell', 
//     img: '/assets/accessories/wet_cell_trapezoidal.png',
//     text: `
//       Cell đo phương pháp lỏng dùng cho LT3600 Series.      
//       Thiết kế bao gồm 2 tấm kính tròn 2 bên và vòng đệm cao su O-ring.
//       Trang bị thêm cửa sổ hình thang nghiêng để đo các hạt siêu mịn. $./cong-nghe/trapezoidal-window$
//       Khi sử dụng dung môi có tính ăn mòn, cần sử dụng vòng đệm O-ring phù hợp.
//       Khi 2 tấm kính bị mờ hoặc xước, cần thay bộ mới để đảm bảo tính truyền quang.
//       Được cung cấp kèm theo 1 bộ khi mua bộ phân tán Hydrolink hoặc Hydrolink SV.
//     `
//   },
//   {
//     model: 'Dry Measurement Cell', 
//     img: '/assets/accessories/dry_cell.png',
//     text: `
//       Cell đo phương pháp khô dùng cho LT2200 Series và LT3600 Series.      
//       Thiết kế bao gồm 2 tấm kính tròn 2 bên và vòng đệm cao su O-ring.
//       Khi sử dụng dung môi có tính ăn mòn, cần sử dụng vòng đệm O-ring phù hợp.
//       Khi 2 tấm kính bị mờ hoặc xước, cần thay bộ mới để đảm bảo tính truyền quang.
//       Được cung cấp kèm theo 1 bộ khi mua bộ phân tán khô Aerolink.
//     `
//   },
// ]

export const getAccessories = (series: string): ProductCard[] => {
  let acc: ProductCard[] = [
  {
    model: 'Wet Measurement Cell', 
    img: '/assets/accessories/wet_cell.jpg',
    text: `
      Cell đo phương pháp lỏng dùng cho LT2200 Series.
      Thiết kế bao gồm 2 tấm kính tròn 2 bên và vòng đệm cao su O-ring.
      Khi sử dụng dung môi có tính ăn mòn, cần sử dụng vòng đệm O-ring phù hợp.
      Khi 2 tấm kính bị mờ hoặc xước, cần thay bộ mới để đảm bảo tính truyền quang.
      Được cung cấp kèm theo 1 bộ khi mua bộ phân tán Hydrolink hoặc Hydrolink SE hoặc Hydrolink SV.
    `
  },
  {
    model: 'Wet Measurement Cell', 
    img: '/assets/accessories/wet_cell_trapezoidal.png',
    text: `
      Cell đo phương pháp lỏng dùng cho LT3600 Series.      
      Thiết kế bao gồm 2 tấm kính tròn 2 bên và vòng đệm cao su O-ring.
      Trang bị thêm cửa sổ hình thang nghiêng để đo các hạt siêu mịn. $./cong-nghe/trapezoidal-window$
      Khi sử dụng dung môi có tính ăn mòn, cần sử dụng vòng đệm O-ring phù hợp.
      Khi 2 tấm kính bị mờ hoặc xước, cần thay bộ mới để đảm bảo tính truyền quang.
      Được cung cấp kèm theo 1 bộ khi mua bộ phân tán Hydrolink hoặc Hydrolink SV.
    `
  },
  {
    model: 'Dry Measurement Cell', 
    img: '/assets/accessories/dry_cell.png',
    text: `
      Cell đo phương pháp khô dùng cho LT2200 Series và LT3600 Series.      
      Thiết kế bao gồm 2 tấm kính tròn 2 bên và vòng đệm cao su O-ring.
      Khi sử dụng dung môi có tính ăn mòn, cần sử dụng vòng đệm O-ring phù hợp.
      Khi 2 tấm kính bị mờ hoặc xước, cần thay bộ mới để đảm bảo tính truyền quang.
      Được cung cấp kèm theo 1 bộ khi mua bộ phân tán khô Aerolink.
    `
  },
  ]
  
  if (series.includes('3600')) acc.shift()
  else if (series.includes('2200')) acc.splice(1,1)
  return acc
}

