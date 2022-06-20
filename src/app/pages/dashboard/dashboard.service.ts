import { Injectable } from '@angular/core';
import { HttpService } from '../../modules/auth/services/http.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DashboardService {
    private readonly baseUrl: string = "/Complaint/Dashboard";
    private Configs = new BehaviorSubject<any|undefined>(undefined);
    constructor(private http: HttpService) { }

    getDashboardDigraphes(){
        this.Configs.next(undefined);
        this.http.getData(this.baseUrl)
            .subscribe(
                response => {
                    if(!!response)this.Configs.next(response!);
                }
            )
    }


    get Configs$(){
        return this.Configs.asObservable();
    }
    
}