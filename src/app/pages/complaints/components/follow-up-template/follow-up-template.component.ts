import { Component, Input, OnInit } from '@angular/core';
import { FollowUpInfo } from '../../model/complaint-follow-up.model';

@Component({
    selector: 'app-follow-up-template',
    templateUrl: './follow-up-template.component.html',
    styles: [`
        .mat-form-field + .mat-form-field {
            margin-left: 8px;
        }
    `]
})

export class FollowUpTemplateComponent implements OnInit {
    @Input() followUpInfo!: FollowUpInfo;
    constructor() { }

    ngOnInit() { }
}