import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CodesService } from '../../system-settings/codes/codes.service';
import { Observable } from 'rxjs';
import { ComplaintsReviewService } from '../services/complaints-review.service';
import { SearchedComplaint } from '../model/complaints-review.model';
import { Router } from '@angular/router';
@Component({
    selector: 'complaints-review',
    templateUrl: './complaints-review.component.html'
})

export class ComplaintsReviewComponent implements OnInit {
    codes$: Observable<any>
    SearchForm : FormGroup;
    submitted: boolean = false;

    complaints$: Observable<SearchedComplaint[]|undefined>;
    constructor(
        public fb: FormBuilder,
        private codesService: CodesService,
        private complaintsReviewService: ComplaintsReviewService,
        private router: Router) { 
        
        this.initCodes();
        this.initForm();
    }

    ngOnInit() { 
        this.complaints$ = this.complaintsReviewService.Complaints$;
    }

    private initCodes(){
        this.codes$ = this.codesService.getPageCodes("complaint");
    }

    private initForm() {
        this.SearchForm = this.fb.group({
            "FromDate": ["", [Validators.required]],
            "ToDate": ["", []],
            "ComplaintRiskLevel": ["", []],
            "ComplaintType": ["", []],
            "Status":  ["", []],
        })
    }

    get formControls(){
        return this.SearchForm.controls;
    }

    fetchComplaints(){
       this.complaintsReviewService.getComplaints(this.SearchForm.value);
    }

    onPursueClick(complaintId:number){
        this.router.navigate(['/Complaints/ComplaintFollowUp',complaintId])
    }
}