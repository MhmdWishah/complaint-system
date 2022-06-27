import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, ChildActivationEnd } from '@angular/router';
import { ComplaintFollowUpService } from '../services/complaint-follow-up.service';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { ComplaintInfo, FollowUpInfo } from '../model/complaint-follow-up.model';
import { CodesService } from '../../system-settings/codes/codes.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { startWith, switchMap, map, filter } from 'rxjs/operators';
import { CommonService } from '../../../services/common.service';
import { CommonEmp } from '../../../models/common-autocomplete.model';
import { Response } from 'src/app/models/common-response.model';

@Component({
    selector: 'complaint-follow-up',
    templateUrl: './complaint-follow-up.component.html',
    styles: [`
        .mat-tab-group {
            margin-bottom: 48px;
        }

        .mat-chip-list-wrapper{
            padding: 0.5rem 0;
        }

        .chipListInput {
            padding: 0rem 1rem;
            height: 2.5rem;
            font-size: 14px;
            font-weight: 500;
        }
    `]
})

export class ComplaintFollowUpComponent implements OnInit, OnDestroy {
    private SelectedComlaintID = new BehaviorSubject<number|undefined|null>(undefined);
    codes$ : Observable<any>;
    selectedComplaintInfo$: Observable<ComplaintInfo|undefined>;
    
    form: FormGroup;
    submitted: boolean = false;
    empSearchControl = new FormControl();
    private selectedToEmps = new BehaviorSubject<CommonEmp[]>([]);

    searchedEmp$: Observable<CommonEmp[]>;

    allFollowUps$ : Observable<FollowUpInfo[]|undefined>;

    FollowUpTypeValueSubscription: Subscription;
    FollowUpSaveSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private compFollowUpService: ComplaintFollowUpService,
        private codesService: CodesService,
        private fb: FormBuilder,
        private commonService: CommonService,
        private router: Router
    ) { 
        this.route.paramMap.subscribe(
            (params: any) => {
                // console.log("params:",params);
                this.destroy();
                if(!!params.get('id')){
                    this.SelectedComlaintID.next(+params.get('id'));
                    this.compFollowUpService.getComplaintInfo(this.SelectedComlaintID!.getValue()!);
                    this.fetchFollowUps();  
                }
            }
        );
        // this.router.events
        // .pipe(filter((e:any) => {
        //     if(e instanceof NavigationStart && e?.url! == "/Complaints/ComplaintFollowUp"){
        //         return e;
        //     }
        //     if(e instanceof ChildActivationEnd && e?.snapshot.routeConfig!.path! == "ComplaintFollowUp"){
        //         return e;
        //     }
        //     return e;
        // }))
        // .subscribe((e: NavigationStart|any) => {
        //     console.log("NavigationStart:",e)
        //     const navigation  = this.router.getCurrentNavigation();
        //     // console.log("NavigationStart:",e)
        //     if(!!navigation?.extras!.state!['id']!){
        //         console.log("getCurrentNavigation:",navigation)
        //         this.SelectedComlaintID = navigation!.extras.state ? navigation!.extras.state.orderId : 0;
        //     }
        // });
        this.initForm();
        
    }
    ngOnDestroy(): void {
        this.destroy();
    }

    ngOnInit() {       
        this.selectedComplaintInfo$ = this.compFollowUpService.SelectedComplaintInfo$;
        this.codes$ = this.codesService.getPageCodes('ComplaintFollowUp');
        this.initSearchForEmps();
        this.allFollowUps$ = this.compFollowUpService.AllFollowUps$;
        this.handleComplaintTypeChange();
    }

    private handleComplaintTypeChange = () => {
        this.FollowUpTypeValueSubscription = this.form.controls['FollowUpType'].valueChanges
            .subscribe(
                value => {
                    if(value == 102){
                        this.form.controls['ToEmpID'].reset("");
                        this.selectedToEmps.next([]);
                        this.form.controls['ToEmpID'].clearValidators();
                        this.form.controls['ToEmpID'].updateValueAndValidity();
                    }else{
                        this.form.controls['ToEmpID'].setValidators(Validators.required);
                        this.form.controls['ToEmpID'].updateValueAndValidity();
                    }
                }
            )
    }

    private initForm() {
        // "complaintID": "string",
        this.form = this.fb.group({
            "FollowUpType": [null, [Validators.required, Validators.maxLength(4000), Validators.minLength(0)]],
            "InsertDateTime": [null, [Validators.required]],
            "Description": ["", [Validators.required]],
            "ToEmpID": [[], [Validators.required]],
        })
    }

    get formControls(){
        return this.form.controls;
    }

    private initSearchForEmps() {
        this.searchedEmp$ = this.empSearchControl.valueChanges.pipe(
          startWith(''),
          switchMap((value) =>
            value ? 
                this.commonService.search('Employees', value).pipe(map(Employees => {
                    const filteredEmps = Employees.filter(emp => !this.selectedToEmps.value.map(selectedEmp => selectedEmp.Code).includes(emp.Code));
                    return [...filteredEmps];
                }))
                :
                of([])
          )
        );
      }

    get SelectedToEmps$(){
        return this.selectedToEmps.asObservable();
    }

    removeEmp(emp:CommonEmp){
        var arrSelectedToEmps = [...this.selectedToEmps.value.filter(selectedEmp => selectedEmp.Code != emp.Code)];
        this.selectedToEmps.next([...arrSelectedToEmps]);
        this.form.controls['ToEmpID'].setValue(arrSelectedToEmps.map(emp => emp.Code).join());
    }

    addEmp(emp:CommonEmp){
        var arrSelectedToEmps = [...this.selectedToEmps.value];
        arrSelectedToEmps.push(emp);
        this.selectedToEmps.next([...arrSelectedToEmps]);
        this.form.controls['ToEmpID'].setValue(arrSelectedToEmps.map(selectedEmp => selectedEmp.Code).join());
        const ele: any = document!.getElementById("chipListToEmpsInput");
        ele.value = "";
    }

    fetchFollowUps(){
        this.compFollowUpService.searchComplaintFollowUps(this.SelectedComlaintID!.getValue()!);
    }
    saveFollowUp(){
        this.submitted = true;
        if(this.form.valid){
            this.FollowUpSaveSubscription = this.compFollowUpService.SaveComplaintFollowUp({...this.form.value, ComplaintID: this.SelectedComlaintID!.getValue()!})
                .subscribe( 
                    (response: Response|undefined) =>{
                        if(response!.status! > 0){
                            this.clearAfterSave();
                            // this.fetchFollowUps();
                        }
                    }
                );
        }
    }

    clearAfterSave(){
        const ele: any = document!.getElementById("chipListToEmpsInput");
        if(!!ele)
            ele!.value = "";
        this.selectedToEmps.next([]);
        if(!!this.form)
            this.form!.reset();
        this.submitted = false;
    }

    get SelectedComlaintID$(){
        return this.SelectedComlaintID.asObservable();
    }

    destroy(){
        if(!!this.FollowUpTypeValueSubscription)
            this.FollowUpTypeValueSubscription.unsubscribe();
        this.compFollowUpService.destroy();
        this.SelectedComlaintID.next(undefined);
        if(!!this.FollowUpSaveSubscription)
            this.FollowUpSaveSubscription!.unsubscribe();
        this.clearAfterSave();
        this.selectedToEmps.next([]);
    }

}