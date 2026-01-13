import { Injectable } from '@angular/core';
import { HttpService } from '../../../modules/auth/services/http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { PublicComplaint, PublicComplaintSearchParams } from './public-complaints.model';
import { Response } from 'src/app/models/common-response.model';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PublicComplaintsService {
    private readonly baseUrl: string = '/Complaint';
    private readonly apiBaseUrl: string = environment.baseUrl;

    private _complaints$ = new BehaviorSubject<PublicComplaint[] | undefined>(undefined);
    public readonly complaints$ = this._complaints$.asObservable();

    private _isLoading$ = new BehaviorSubject<boolean>(false);
    public readonly isLoading$ = this._isLoading$.asObservable();

    constructor(
        private httpS: HttpService,
        private http: HttpClient,
        private auth: AuthService
    ) { }

    getPublicComplaints(params?: PublicComplaintSearchParams): void {
        this._isLoading$.next(true);
        this.httpS.getData(this.baseUrl + '/Public', params)
            .subscribe({
                next: (response: PublicComplaint[]) => {
                    this._complaints$.next(response);
                    this._isLoading$.next(false);
                },
                error: () => {
                    this._isLoading$.next(false);
                }
            });
    }

    savePublicComplaint(data: PublicComplaint): Observable<Response | any> {
        return this.httpS.saveData(this.baseUrl + '/Public', data);
    }

    convertToOfficial(complaintPublicID: number): Observable<Response | any> {
        let params = new HttpParams().set('ComplaintPublicID', complaintPublicID.toString());
        return this.http.post(this.apiBaseUrl + this.baseUrl + '/PublicToOfficial', null, {
            params: params,
            headers: this.auth.getHeaders()
        });
    }
}
