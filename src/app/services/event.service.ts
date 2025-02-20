import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CustomerClass } from "../shared/customer-interface";

@Injectable({
    providedIn: 'root'
})
export class EventService{
    private subject = new Subject();
    // private temp = new Subject<any>()
    temp_customerListByUser!: any
    temp_userData!: any

    emitt(eventName: string, payload: any){
        this.subject.next({eventName, payload})
        // console.log(eventName, payload)
    }

    listen(eventName: string, callback: (event: any) => void){
        this.subject.asObservable().subscribe((nextObj: any) => {
            if (eventName === nextObj.eventName){
                callback(nextObj.payload)
            }
        })
    }

    // updateTemp(cus: any) {
    //     this.temp.next(cus);
    // }
    
    // getTemp(): Observable<any> {
    //     return this.temp.asObservable();
    // }  
}

