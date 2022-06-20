import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpService } from '../../../modules/auth/services/http.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Response } from 'src/app/models/common-response.model';
import { ComplaintsSearchFilters, SearchedComplaint } from '../model/complaints-review.model';

@Injectable({providedIn: 'root'})
export class ComplaintsReviewService {
    private readonly baseUrl: string = "/Complaint";
    private AllComplaints = new BehaviorSubject<SearchedComplaint[]|undefined>(undefined);
    constructor(
        private httpS:HttpService,
        private httpC: HttpClient,
        private auth: AuthService
    ) { }


    getComplaints(filters:ComplaintsSearchFilters) {
        this.httpS.getData(this.baseUrl+"/Search", filters)
            .subscribe( (response: any[]) =>{
                this.AllComplaints.next(response);
            });
    }

    get Complaints$(): Observable<SearchedComplaint[]|undefined>{
        return this.AllComplaints.asObservable();
    }
    
}