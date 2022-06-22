import { Injectable } from '@angular/core';
import { HttpService } from '../../../modules/auth/services/http.service';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComplaintInfo, ComplaintFollowUp, FollowUpInfo } from '../model/complaint-follow-up.model';
import { Response } from 'src/app/models/common-response.model';

@Injectable({providedIn: 'root'})
export class ComplaintFollowUpService {
    private readonly baseUrl: string = "/Complaint";
    private SelectedComplaintInfo = new BehaviorSubject<ComplaintInfo|undefined>(undefined);
    private AllFollowUps = new BehaviorSubject<FollowUpInfo[]|undefined>(undefined);
    constructor(
        private http:HttpService) { }

    getComplaintInfo(complaintId:number) {
        this.SelectedComplaintInfo.next(undefined);
        this.http.getData(this.baseUrl+"/Select", {ID: complaintId})
            .subscribe( (response: ComplaintInfo) =>{
                this.SelectedComplaintInfo.next(response);
            });
    }

    get SelectedComplaintInfo$(): Observable<ComplaintInfo|undefined>{
        return this.SelectedComplaintInfo.asObservable();
    }

    searchComplaintFollowUps(SelectedComlaintID: number) {
        this.AllFollowUps.next(undefined);
        this.http.getData(this.baseUrl+"/FollowUpSearch", {ComplaintID: SelectedComlaintID})
            .subscribe( (response: FollowUpInfo[]) => {
                if(Array.isArray(response) && !!response){
                    this.AllFollowUps.next(response)
                }
            });
    }

    get AllFollowUps$(): Observable<FollowUpInfo[]|undefined>{
        return this.AllFollowUps.asObservable();
    }

    SaveComplaintFollowUp(data:ComplaintFollowUp): Observable<Response|any> {
        return this.http.saveData(this.baseUrl+"/FollowUpSave", data);
    }

    destroy(){
        this.SelectedComplaintInfo.next(undefined);
        this.AllFollowUps.next(undefined);
    }
    
}