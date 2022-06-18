import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CodesService } from '../../system-settings/codes/codes.service';
import { ComplaintModelService } from '../services/complaint-model.service';
import { Observable } from 'rxjs';
import { Code } from '../../system-settings/system-settings.model';
import { Response } from '../../users/models/roles.model';
@Component({
    selector: 'complaint-model',
    templateUrl: './complaint-model.component.html',
})

export class ComplaintModelComponent implements OnInit {
    codes$: Observable<any>
    form : FormGroup;
    submitted: boolean = false;
    constructor(
        private commonSerive: CommonService,
        private complaintModelService: ComplaintModelService,
        public fb: FormBuilder,
        private codesService: CodesService,
    ) { 
        this.initForm();
    }   

    ngOnInit() { 
        this.initCodes();
    }

    private initCodes(){
        this.codes$ = this.codesService.getPageCodes("complaint");
    }

    private initForm() {
        this.form = this.fb.group({
            "ComplainantName": ["", [Validators.required]],
            "ComplainantAddress": ["", []],
            "ComplainantMobileNumber": ["", []],
            "ComplainantEmail": ["", []],
            "ComplaintPlace": ["", [Validators.required]],
            "ComplaintDate": ["", [Validators.required]],
            "IsSecretComplaint": [false, [Validators.required]],
            "ComplaintType": [null, [Validators.required]],
            "ComplaintDescription": ["", [Validators.required]],
            "ComplaintExpectedResults": ["", [Validators.required]],
            "ComplainantGender": [null, [Validators.required]],
            "ComplaintRiskLevel": [null, [Validators.required]],
            "ComplaintSourse": [null, [Validators.required]],
        })
    }

    get formControls(){
        return this.form.controls;
    }

    save(){
        this.submitted = true;
        if(this.form.valid){
            this.complaintModelService.saveComplaint(this.form.value)
                .subscribe(
                    (response: Response) => {
                        if(response!.status > 0){
                            this.clear();
                        }
                    }
                );
        }
    }


    clear(){
        this.form.reset();
        this.form.controls['isSecretComplaint'].reset(false);
        this.submitted = false;
    }
}