import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { FormBuilder } from '@angular/forms';
import { CodesService } from '../system-settings/codes/codes.service';
import { ComplaintModelService } from './complaint-model.service';
import { Observable } from 'rxjs';
import { Code } from '../system-settings/system-settings.model';
@Component({
    selector: 'complaint-model',
    templateUrl: './complaint-model.component.html'
})

export class ComplaintModelComponent implements OnInit {
    codes$: Observable<any>
    constructor(private commonSerive: CommonService,
        private complaintModelService: ComplaintModelService,
        public fb: FormBuilder,
        private codesService: CodesService,) { }

    ngOnInit() { 
        this.initCodes();
    }

    private initCodes(){
        this.codesService.getPageCodes("complaint").subscribe();
    }
}