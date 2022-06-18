import { Injectable } from '@angular/core';
import { HttpService } from '../../../modules/auth/services/http.service';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComplaintInfo } from '../model/complaint-pursue.model';

@Injectable({providedIn: 'root'})
export class ComplaintPursueService {
    private readonly baseUrl: string = "/Complaint";
    private SelectedComplaintInfo = new BehaviorSubject<ComplaintInfo|undefined>(undefined);
    constructor(
        private http:HttpService) { }

    getComplaintInfo(complaintId:number) {
        this.http.getData(this.baseUrl+"/Select", {ID: complaintId})
            .subscribe( (response: ComplaintInfo) =>{
                this.SelectedComplaintInfo.next(response);
            });
    }

    get SelectedComplaintInfo$(): Observable<ComplaintInfo|undefined>{
        return this.SelectedComplaintInfo.asObservable();
    }
    
}