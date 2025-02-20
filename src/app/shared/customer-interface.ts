// export interface customerItf {
//     companyName: string, 	
//     address: string,
//     application: string,
//     model: string,
//     orderDate: string,
//     saleDate: string,
//     seller: string,
//     note: string
// }

export class CustomerClass {
    constructor(         
        readonly id: string = '',
        readonly companyName: string = '', 	
        readonly address: string = '',
        readonly province: string = '',
        readonly application: string = '',
        readonly model: string = '',
        readonly orderDate: string = '',
        readonly seller: string = '',
        readonly subdealer: boolean = false,     
        readonly tradingName: string = '', 	
        readonly tradingAddress: string = '',   
        readonly status: string = '', 	
        readonly successDate: string = '', 
        readonly failReason: string = '', 	
    ){}
}

export const CustomerDetail : any = {
    companyName: 'Company Name', 	
    address: 'Address',
    application: 'Application',
    model: 'Model',
    orderDate: 'Order Date',
    seller: 'Relative Sales',
    subdealer: 'Cooperate with other trading company',      
    status: 'Status', 	
}

// export const CustomerColumns : any = {
//     companyName: 'Company Name', 	
//     address: 'Location/Address',
//     application: 'Application',
//     model: 'Model',
//     orderDate: 'Order Date',
//     saleDate: 'Est. Sales Order Date',
//     seller: 'Relative Sales',
//     note: 'Note'
// }

// export const DetailInterface : any = {
//     0: ['companyName', 'Company Name'], 	
//     1: ['address', 'Address'],
//     // 2: ['province', 'Province'],
//     3: ['application', 'Application'],
//     4: ['model', 'Model'],
//     5: ['orderDate', 'Order Date'],
//     6: ['seller', 'Relative Sales'],
//     7: ['subdealer', 'Cooperate with other trading company'],
//     8: ['tradingName', 'Trading Company'],
//     9: ['tradingAddress', 'Trading Address'],
//     10: ['status', 'Status'],
//     11: ['successDate', 'Success Date'],
// }
