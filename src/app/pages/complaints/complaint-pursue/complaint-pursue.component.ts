import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComplaintPursueService } from '../services/complaint-pursue.service';
import { Observable } from 'rxjs';
import { ComplaintInfo } from '../model/complaint-pursue.model';

@Component({
    selector: 'complaint-pursue',
    templateUrl: './complaint-pursue.component.html'
})

export class ComplaintPursueComponent implements OnInit {
    private readonly ParamID: number|undefined;

    selectedComplaintInfo$: Observable<ComplaintInfo|undefined>;
    
    constructor(
        private route: ActivatedRoute,
        private compPursueService: ComplaintPursueService,
    ) { 
        this.ParamID = +this.route.snapshot.paramMap.get('id')!;
        console.log("this.ParamID: ",this.ParamID);
    }

    ngOnInit() {
        this.compPursueService.getComplaintInfo(this.ParamID!);
        this.selectedComplaintInfo$ = this.compPursueService.SelectedComplaintInfo$;
    }
}