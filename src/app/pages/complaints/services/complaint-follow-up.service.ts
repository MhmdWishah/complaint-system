import { Injectable } from '@angular/core';
import { HttpService } from '../../../modules/auth/services/http.service';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComplaintInfo, ComplaintFollowUp, FollowUpInfo, ComplaintEmp, ComplaintOtherEmps } from '../model/complaint-follow-up.model';
import { Response } from 'src/app/models/common-response.model';
import { CommonEmp } from '../../../models/common-autocomplete.model';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ComplaintFollowUpService {
    private readonly baseUrl: string = "/Complaint";
    private SelectedComplaintInfo = new BehaviorSubject<ComplaintInfo|undefined>(undefined);
    private AllFollowUps = new BehaviorSubject<FollowUpInfo[]|undefined>(undefined);
    private ComplaintEmps = new BehaviorSubject<ComplaintEmp[]|undefined>(undefined);
    private ComplaintOtherEmps = new BehaviorSubject<{ComplaintOtherEmployees: string}|undefined>(undefined);
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
        return this.http.saveData(this.baseUrl+"/FollowUpSave", data)
    }

    SaveComplaintEmp(emp:ComplaintEmp): Observable<Response|any> {
        return this.http.saveData(this.baseUrl+"/ComplaintEmployee", emp)
            .pipe(tap((response: Response|any) => {

                if(+response!.status > 0){
                    const oldEmps = this.ComplaintEmps!.getValue();
                    var newEmps: ComplaintEmp[] = [];

                    if(!!oldEmps && oldEmps!.length > 0){
                        newEmps = [...oldEmps, emp];

                    }else{
                        newEmps = [emp];

                    }
                    this.ComplaintEmps.next(newEmps);


                }
            }));
    }

    SearchComplaintEmps(ComplaintID:number) {
        this.http.getData(this.baseUrl+"/ComplaintEmployee", {ComplaintID:ComplaintID})
            .subscribe(
                (complaintEmps: ComplaintEmp[]) => {
                    if(Array.isArray(complaintEmps) && !!complaintEmps){
                        this.ComplaintEmps.next(complaintEmps);
                    }
                }
            );
    }

    get ComplaintEmps$(): Observable<ComplaintEmp[]|undefined>{
        return this.ComplaintEmps.asObservable();
    }

    RemoveComplaintEmps(ComplaintEmp:ComplaintEmp) {
        this.http.deleteDate(this.baseUrl+"/ComplaintEmployee", ComplaintEmp)
            .subscribe(
                (response: Response|any) => {
                    if(+response!.status > 0){
                        const oldEmps = this.ComplaintEmps!.getValue();
                        var newEmps: ComplaintEmp[] = [];
                        if(!!oldEmps && oldEmps!.length > 0){
                            newEmps = [...oldEmps.filter(emp => (emp.EmpID != ComplaintEmp.EmpID))];
                        }else{
                            newEmps = [];
                        }
                        this.ComplaintEmps.next(newEmps);
                    }
                }
            );
    }


    SaveComplaintOtherEmps(emp:ComplaintOtherEmps) {
        return this.http.saveData(this.baseUrl+"/OtherEmployees", emp)
            .pipe(tap(
                (response: Response|any) => {
                    if(+response.status > 0){
                        this.ComplaintOtherEmps.next({ComplaintOtherEmployees: emp.ComplaintOtherEmployees});
                    }else{
                        this.ComplaintOtherEmps.next(this.ComplaintOtherEmps.getValue());
                    }

                }
            ));
    }

    GetComplaintOtherEmps(ComplaintID:number) {
        this.http.getData(this.baseUrl+"/OtherEmployees", {ComplaintID:ComplaintID})
            .subscribe(
                (other: {ComplaintOtherEmployees:string}|any) => {
                    console.log("other.ComplaintOtherEmployees here **",other.ComplaintOtherEmployees)
                    if(!!other.ComplaintOtherEmployees || other.ComplaintOtherEmployees == ""){
                        this.ComplaintOtherEmps.next(other);
                    }else{
                        this.ComplaintOtherEmps.next(undefined); 
                    }
                    
                }
            );
    }

    get ComplaintOtherEmps$(){
        return this.ComplaintOtherEmps.asObservable();
    }


    destroy(){
        this.SelectedComplaintInfo.next(undefined);
        this.AllFollowUps.next(undefined);
        this.ComplaintEmps.next(undefined);
        this.ComplaintOtherEmps.next(undefined);
    }
    
}