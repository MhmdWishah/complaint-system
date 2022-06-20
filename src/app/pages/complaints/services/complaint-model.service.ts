import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpService } from '../../../modules/auth/services/http.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { Observable } from 'rxjs';
import { Response } from 'src/app/models/common-response.model';
import { ComplaintModel } from '../model/complaint.model';

@Injectable({providedIn: 'root'})
export class ComplaintModelService {
    private readonly baseUrl: string = "/Complaint";

    constructor(
        private httpS:HttpService,
        private httpC: HttpClient,
        private auth: AuthService
    ) { }


    saveComplaint(data:ComplaintModel): Observable<Response|any> {
        return this.httpS.saveData(this.baseUrl+"/Save", data);
    }
    
}