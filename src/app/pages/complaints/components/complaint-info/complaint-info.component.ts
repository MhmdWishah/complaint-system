import { Component, Input, OnInit } from '@angular/core';
import { ComplaintInfo } from '../../model/complaint-pursue.model';

@Component({
    selector: 'app-complaint-info',
    templateUrl: './complaint-info.component.html'
})

export class ComplaintInfoComponent implements OnInit {
    @Input() ComplaintInfo!:ComplaintInfo;
    constructor() { }

    ngOnInit() { }
}