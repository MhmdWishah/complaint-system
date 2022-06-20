import { Component, Input, OnInit } from '@angular/core';
import { MyFollowUpInfo } from '../../models/my-follow-ups.model';

@Component({
    selector: 'app-my-follow-up-template',
    templateUrl: './my-follow-up-template.component.html',
    styles: [`
        .mat-form-field + .mat-form-field {
            margin-left: 8px;
        }
    `]
})

export class MyFollowUpTemplateComponent implements OnInit {
    @Input() followUpInfo!: MyFollowUpInfo;
    constructor() { }

    ngOnInit() { }
}