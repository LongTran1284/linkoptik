export class ProductCard{
    constructor(        
        public model: string, 
        public img: string,
        public text: string,
        public path?: string,        
        public link?: string,
    ){}
}