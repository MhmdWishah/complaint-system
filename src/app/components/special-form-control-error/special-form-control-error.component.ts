

import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'special-form-control-error-template',
    templateUrl: './special-form-control-error.component.html'
})

export class SpecialFormControlErrorComponent implements OnInit {
    @Input() control: AbstractControl;
    constructor() { }

    ngOnInit() { }
}