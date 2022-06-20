import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyFollowUpsService } from '../services/my-follow-up.service';
import { FollowUpServices } from '../services/index';
import { ComplaintFollowUpService } from '../../complaints/services/complaint-follow-up.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CodesService } from '../../system-settings/codes/codes.service';
import { MyFollowUpInfo } from '../models/my-follow-ups.model';

@Component({
    selector: 'my-follow-ups',
    templateUrl: 'my-follow-ups.component.html'
})

export class MyFollowUpsComponent implements OnInit {
    readonly complaintId: number | undefined;
    myFollowUps$: Observable<MyFollowUpInfo[]|undefined>;
    codes$: Observable<any>;
    
    form: FormGroup;
    submitted: boolean = false;
    constructor(private route: ActivatedRoute,
        private myFollowUpsService: MyFollowUpsService,
        private fb: FormBuilder,
        private codesService: CodesService,
        ) { 
        this.complaintId = +this.route.snapshot.paramMap.get('id')!;
        this.fetchMyFollowUps();
        this.initForm();
    }

    ngOnInit() { 
        this.codes$ = this.codesService.getPageCodes('ComplaintFollowUp');
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
            this.myFollowUpsService.SaveFollowUpComplateData({...this.form.value, ComplaintID: this.complaintId!})
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
}