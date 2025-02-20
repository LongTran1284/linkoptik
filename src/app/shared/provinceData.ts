import { optionItem } from "lg-components"

const provinceList = {
    North: [
      'Hà Nội', 'Vĩnh Phúc', 'Bắc Ninh', 'Quảng Ninh', 'Hải Dương', 'Hải Phòng', 'Hưng Yên', 'Thái Bình', 
      'Hà Nam', 'Nam Định', 'Ninh Bình', 
      'Hà Giang', 'Cao Bằng', 'Bắc Kạn', 'Tuyên Quang', 'Lào Cai', 'Yên Bái', 'Thái Nguyên', 'Lạng Sơn', 
      'Bắc Giang', 'Phú Thọ', 'Điện Biên', 'Lai Châu', 'Sơn La', 'Hoà Bình'
    ],
  
    Central: [
      'Thanh Hoá','Nghệ An','Hà Tĩnh','Quảng Bình','Quảng Trị','Thừa Thiên Huế','Đà Nẵng','Quảng Nam','Quảng Ngãi',
      'Bình Định','Phú Yên','Khánh Hoà','Ninh Thuận','Bình Thuận',
      'Kon Tum','Gia Lai','Đắk Lắk','Đắk Nông','Lâm Đồng',
    ],
  
    South: [
      'Bình Phước','Tây Ninh','Bình Dương','Đồng Nai','Bà Rịa - Vũng Tàu','TP. Hồ Chí Minh',
      'Long An','Tiền Giang','Bến Tre','Trà Vinh','Vĩnh Long','Đồng Tháp','An Giang','Kiên Giang','Cần Thơ','Hậu Giang',
      'Sóc Trăng','Bạc Liêu','Cà Mau'
    ]
}

const provinceList_EN = {
    North: [
      'Ha Noi City', 'Vinh Phuc', 'Bac Ninh', 'Quang Ninh', 'Hai Dương', 'Hai Phong', 'Hung Yen', 'Thai Binh', 
      'Ha Nam', 'Nam Đinh', 'Ninh Binh', 
      'Ha Giang', 'Cao Bang', 'Bac Kan', 'Tuyen Quang', 'Lao Cai', 'Yen Bai', 'Thai Nguyen', 'Lang Son', 
      'Bac Giang', 'Phu Tho', 'Dien Bien', 'Lai Chau', 'Son La', 'Hoa Binh'
    ],
  
    Central: [
      'Thanh Hoa','Nghe An','Ha Tinh','Quang Binh','Quang Tri','Thua Thien Hue','Da Nang','Quang Nam','Quang Ngai',
      'Binh Dinh','Phu Yen','Khanh Hoa','Ninh Thuan','Binh Thuan',
      'Kon Tum','Gia Lai','Dak Lak','Dak Nông','Lam Dong',
    ],
  
    South: [
      'Binh Phuoc','Tay Ninh','Binh Duong','Dong Nai','Ba Ria - Vung Tau','Ho Chi Minh City',
      'Long An','Tien Giang','Ben Tre','Tra Vinh','Vinh Long','Dong Thap','An Giang','Kien Giang','Can Tho','Hau Giang',
      'Soc Trang','Bac Lieu','Ca Mau'
    ]
}

const districList: any = {
    'TP. Hồ Chí Minh': [
        'Thành phố Thủ Đức', 
        'Quận 1', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 10', 'Quận 11', 'Quận 12', 'Quận Phú Nhuận','Quận Bình Thạnh', 'Quận Gò Vấp', 'Quận Tân Bình', 'Quận Bình Tân',  'Quận Tân Phú',
        'Huyện Bình Chánh', 'Huyện Hóc Môn', 'Huyện Củ Chi', 'Huyện Cần Giờ', 'Huyện Nhà Bè'
    ]
}

export class ProvinceClass {
    constructor(         
        readonly area: string = '',
        readonly val: string = '', 	        
    ){}
}

export function createDistrictption(province: string){
    let option: optionItem[] = []
    districList[province].forEach((item: string) => option.push({key: item, value: item}))    
    return option
}
  
function createProvinceOption({area, list}:{area?: string, list: string[]}){
    let option: optionItem[] = []
    // list.forEach(item => option.push({key: {area: area, val: item}, value: item}))    
    list.forEach(item => option.push({key: item, value: item}))    
    return option
}
  
export const provinceOption: optionItem[] = [
    ...createProvinceOption({area:'North', list: provinceList['North']}),
    ...createProvinceOption({area:'Central', list: provinceList['Central']}),
    ...createProvinceOption({area:'South', list: provinceList['South']})  ,
    // ...[{key: 'Ho Chi Minh City', value: 'Ho Chi Minh City'}]
]