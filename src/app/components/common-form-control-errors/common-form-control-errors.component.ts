import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'common-form-control-errors-template',
    templateUrl: './common-form-control-errors.component.html'
})

export class CommonFormControlErrorsComponent implements OnInit {
    @Input() control: AbstractControl;
    @Input() conditions : boolean[];
    @Input() submitted : boolean;
    commonValidations : CommonValidationsGroup = {
        UnreactiveValidations: [
            {name: "required", msg: "هذا الحقل مطلوب!"},
            {name: "email", msg: "الإيميل غير صحيح!"},
        ],
        ReactiveValidations: [
            {name: "maxlength", msg: "عدد الأحرف يجب ألا يتجاوز "},
            {name: "minlength", msg: "عدد الأحرف يجب ألا يقل عن "},
            {name: "min", msg: "يجب ألا تتجاوز قيمة الحقل "},
            {name: "max", msg: "يجب ألا تقل قيمة الحقل عن "},
        ]
    };
    constructor() { }

    ngOnInit() { }
}

export interface CommonValidationsGroup {
    ReactiveValidations: {name: string;msg: string;}[];
    UnreactiveValidations: {name: string;msg: string;}[]
    
}