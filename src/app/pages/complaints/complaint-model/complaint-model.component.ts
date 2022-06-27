import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CodesService } from '../../system-settings/codes/codes.service';
import { ComplaintModelService } from '../services/complaint-model.service';
import { Observable } from 'rxjs';
import { Code } from '../../system-settings/system-settings.model';
import { Response } from 'src/app/models/common-response.model';
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
            "ComplainantName": ["", [Validators.required, Validators.maxLength(100)]],
            "ComplainantAddress": ["", []],
            "ComplainantAddressDetails": ["", []],
            "ComplainantMobileNumber": ["", [Validators.maxLength(15)]],
            "ComplainantEmail": ["", [Validators.email]],
            "ComplaintPlace": ["", [Validators.required, Validators.maxLength(200)]],
            "ComplaintDate": ["", [Validators.required, Validators.minLength(1)]],
            "IsSecretComplaint": [false, [Validators.required]],
            "ComplaintType": [null, [Validators.required]],
            "ComplaintDescription": ["", [Validators.required, Validators.maxLength(4000)]],
            "ComplaintExpectedResults": ["", [Validators.required, Validators.maxLength(4000)]],
            "ComplainantGender": [null, [Validators.required]],
            "ComplaintRiskLevel": [null, [Validators.required]],
            "ComplaintSourse": [null, [Validators.required]],
            "DepartmentID": [null, []],

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
        this.form.controls['IsSecretComplaint'].reset(false);
        this.submitted = false;
    }
}