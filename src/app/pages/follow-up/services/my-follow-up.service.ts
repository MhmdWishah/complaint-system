import { Injectable } from '@angular/core';
import { HttpService } from '../../../modules/auth/services/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MyFollowUpInfo, FollowUpCompleteData } from '../models/my-follow-ups.model';

@Injectable({providedIn: 'root'})
export class MyFollowUpsService {
    private readonly baseUrl: string = "/Complaint";
    private AllMyFollowUps = new BehaviorSubject<MyFollowUpInfo[]|undefined>(undefined);
    constructor(
        private http:HttpService) { }

    searchComplaintFollowUps(SelectedComlaintID: number) {
        this.AllMyFollowUps.next(undefined);
        this.http.getData(this.baseUrl+"/FollowUpSearch", {ComplaintID: SelectedComlaintID})
            .subscribe( (response: MyFollowUpInfo[]) => {
                console.log("FollowUps response:", response)
                if(Array.isArray(response) && !!response){
                    this.AllMyFollowUps.next(response);
                }
            });
    }

    get AllMyFollowUps$(): Observable<MyFollowUpInfo[]|undefined>{
        return this.AllMyFollowUps.asObservable();
    }

    SaveFollowUpComplateData(data:FollowUpCompleteData): Observable<Response|any> {
        return this.http.saveData(this.baseUrl+"/FollowUpCompleteDataSave", data);
    }
    
}