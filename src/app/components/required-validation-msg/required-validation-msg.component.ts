import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-required-validation-msg',
  templateUrl: 'required-validation-msg.component.html'
})

export class RequiredValidationMsgComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() submitted: boolean;
  constructor() { }

  ngOnInit() { }
}
