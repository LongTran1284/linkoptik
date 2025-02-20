export interface UserInterface {
    id: string,
    userName: string,
    password: string,
    role: string,
    company: string,
    nickName?: string
}

export class UserClass {
    constructor(         
        // readonly id: string = '0',
        readonly userName: string = '', 	
        readonly password: string = '',
        readonly company: string | null = '',
        readonly nickName: string | null = '',
        readonly role: string  = '',        
    ){}
}

export const UserDetail: any = {
    userName: 'User Name', 	
    password: 'Password',
    company: 'Company',
    nickName: 'Nick Name',        
}