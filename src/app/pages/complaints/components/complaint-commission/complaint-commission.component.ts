import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonEmp } from 'src/app/models/common-autocomplete.model';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { switchMap, startWith, map } from 'rxjs/operators';
import { CommonService } from '../../../../services/common.service';
import { ComplaintEmp, ComplaintOtherEmps } from '../../model/complaint-follow-up.model';
import { ComplaintFollowUpService } from '../../services/complaint-follow-up.service';
import { Response } from 'src/app/models/common-response.model';

@Component({
    selector: 'app-complaint-commission',
    templateUrl: './complaint-commission.component.html',
})

export class ComplaintCommissionComponent implements OnInit, OnDestroy {

    @Input() selectedComlaintId$: Observable<number|undefined|null>;
    selectedComlaintId: number|undefined|null;
    private complaintIDSubscription: Subscription;

    private saveComplaintEmpSubscription: Subscription;


    addEmpSubmitted: boolean = false;
    saveOthersSubmitted: boolean = false;

    complaintEmpsSearchControl = new FormControl("",[Validators.required]);
    selectedEmp: CommonEmp|undefined;
    searchedComplaintEmps$: Observable<CommonEmp[]>;

    complaintOtherEmps = new FormControl("",[Validators.required, Validators.maxLength(500)]);
    complaintOtherEmps$: Observable<{ComplaintOtherEmployees: string}|undefined>;
    complaintOtherEmpsSubscription: Subscription;
    ComplaintEmps$ : Observable<ComplaintEmp[]|undefined>

    constructor(
        private commonService: CommonService,
        private compFollowUpService: ComplaintFollowUpService) { 
        
    }

    ngOnDestroy(): void {
        this.destroy();
    }

    ngOnInit() {
        this.complaintIDSubscription = this.selectedComlaintId$!.subscribe(
            (complaintId) => {
                this.destroy();
                this.selectedComlaintId = complaintId;
                if(!!complaintId){
                    this.initComplaintEmps();
                    this.compFollowUpService.GetComplaintOtherEmps(complaintId);
                }
            }
        )
        this.initSearchForEmps();
        this.ComplaintEmps$ = this.compFollowUpService.ComplaintEmps$;
        this.complaintOtherEmps$ = this.compFollowUpService.ComplaintOtherEmps$;
        this.initComplaintOtherEmps();
    }

    private initSearchForEmps() {
        this.searchedComplaintEmps$ = this.complaintEmpsSearchControl.valueChanges.pipe(
            startWith(''),
            switchMap((value) =>
                value ? 
                    this.commonService.search('Employees', value)
                    :
                    of([])
            )
        );
    }

    private initComplaintOtherEmps(){
        this.complaintOtherEmpsSubscription = this.complaintOtherEmps$.subscribe(
            (otherEmps) => {
                this.complaintOtherEmps.reset();
                if(!!otherEmps && (!!otherEmps.ComplaintOtherEmployees || otherEmps.ComplaintOtherEmployees =="")){
                    this.complaintOtherEmps.setValue(otherEmps.ComplaintOtherEmployees)
                }
            }
        )
    }

    onComplaintEmpSelect(emp:CommonEmp){
        this.selectedEmp = emp;
    }

    saveComplaintEmp(){
        this.addEmpSubmitted = true;
        if(!!this.selectedComlaintId && !!this.selectedEmp?.Code ){
            const complaintEmp: ComplaintEmp = {ComplaintID: this.selectedComlaintId!, EmpID: this.selectedEmp!.Code!, EmpName: this.selectedEmp!.Name!};
            this.compFollowUpService.SaveComplaintEmp(complaintEmp).subscribe(
                (response: Response|undefined) =>{
                    if(+response!.status > 0){
                        this.complaintEmpsSearchControl.reset();
                        this.selectedEmp = undefined;
                        this.addEmpSubmitted = false;
                    }
                }
            );;
        }
    }

    initComplaintEmps(){
        if(!!this.selectedComlaintId)
            this.compFollowUpService.SearchComplaintEmps(this.selectedComlaintId!);
    }

    removeEmp(emp:ComplaintEmp){
        if(!!this.selectedComlaintId)
            this.compFollowUpService.RemoveComplaintEmps(emp);
    }

    saveComplaintOtherEmps(){
        this.saveOthersSubmitted = true;
        if(!!this.selectedComlaintId){
            const data : ComplaintOtherEmps = {ComplaintID: this.selectedComlaintId,  ComplaintOtherEmployees: this.complaintOtherEmps.value}
            this.compFollowUpService.SaveComplaintOtherEmps(data)
                .subscribe(
                    (response: Response|undefined) => {
                        if(+response!.status>0)
                            this.saveOthersSubmitted = false;
                    }
                );
        }
    }

    destroy(){
        this.addEmpSubmitted = false;
        this.saveOthersSubmitted = false;
        this.complaintEmpsSearchControl.reset();
        this.selectedEmp = undefined;
        this.complaintOtherEmpsSubscription?.unsubscribe();
    }
}