import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyFollowUpsService } from '../services/my-follow-up.service';
import { FollowUpServices } from '../services/index';
import { ComplaintFollowUpService } from '../../complaints/services/complaint-follow-up.service';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CodesService } from '../../system-settings/codes/codes.service';
import { MyFollowUpInfo } from '../models/my-follow-ups.model';

@Component({
    selector: 'my-follow-ups',
    templateUrl: 'my-follow-ups.component.html'
})

export class MyFollowUpsComponent implements OnInit, OnDestroy {
    complaintId: number | undefined;
    myFollowUps$: Observable<MyFollowUpInfo[]|undefined>;
    codes$: Observable<any>;
    
    form: FormGroup;
    submitted: boolean = false;

    saveSubscription: Subscription;
    constructor(private route: ActivatedRoute,
        private myFollowUpsService: MyFollowUpsService,
        private fb: FormBuilder,
        private codesService: CodesService,
    ) { 
        this.route.paramMap.subscribe(
            (params: any) => {
                if(!!params.get('id')){
                    this.complaintId = +params.get('id');
                    this.fetchMyFollowUps();
                }
            }
        );
        this.codes$ = this.codesService.getPageCodes('ComplaintFollowUp');
        this.initForm();
    }

    ngOnDestroy(): void {
        this.destroy();
    }

    ngOnInit() { 
        this.myFollowUps$= this.myFollowUpsService.AllMyFollowUps$;
    }

    private initForm() {
        this.form = this.fb.group({
            "Description": ["", [Validators.required, Validators.maxLength(4000), Validators.minLength(0)]],
        })
    }

    get formControls(){
        return this.form.controls;
    }

    fetchMyFollowUps(){
        this.myFollowUpsService.searchComplaintFollowUps(this.complaintId!);
    }

    saveFollowUp(){
        this.submitted = true;
        if(this.form.valid){
            this.saveSubscription = this.myFollowUpsService.SaveFollowUpComplateData({...this.form.value, ComplaintID: this.complaintId!})
                .subscribe( 
                    (response: Response|undefined) => {
                        if(response!.status! > 0){
                            this.clearAfterSave();
                            this.fetchMyFollowUps();
                        }
                    }
                );
        }
    }

    clearAfterSave(){
        this.form.reset();
        this.submitted = false;
    }

    destroy(){
        this.clearAfterSave();
        if(!!this.saveSubscription)
            this.saveSubscription!.unsubscribe();
        this.myFollowUpsService.destroy();
        this.complaintId = undefined;
        this.submitted = false;
    }
}