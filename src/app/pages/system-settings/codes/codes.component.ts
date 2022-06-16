import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject, BehaviorSubject, Observable, of } from 'rxjs';
import { CodeTable, Code } from '../system-settings.model';
import { CodesService } from './codes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.scss']
})

export class CodesComponent implements OnInit {
  form: FormGroup;
  selectedCode: number|null = null;
  dataTables$: Observable<CodeTable[]>;
  dataTableCodes$: Observable<Code[]>;

  isTableFetching: Observable<boolean> = of(false);
  constructor(private codesService: CodesService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,

  ) {
    this.refresh();
  }

  ngOnInit() {
    this.initForm();
    this.isTableFetching = this.codesService.tablesLoading$;
    this.dataTables$ = this.codesService.dataTables$;
    this.dataTableCodes$ = this.codesService.dataTableCodes$;
  }

  refresh = () => {
    this.codesService.getTables()
  }

  private initForm() {
    this.form = this.fb.group({
      "name": [null, Validators.required],
      "eng": [null, Validators.required],
      "tableName": [null, Validators.required]
    })
  }

  selectTable(event: any) {
    this.codesService.getTableCodes(event.target.value);
  }

  saveCode() {
    if (this.form.valid) {
      const code = { ...this.form.value, code: this.selectedCode };
      this.codesService.saveCode(code).
      subscribe(
        (response: any) => {
          this.toastr.success(response.message);
          this.form.reset();
          this.selectedCode = null;
        },
        (err => {
          this.toastr.error(err.error.details);
        })
      );
    } else {
      this.toastr.error("يرجى التأكد من البيانات المدخلة");
    }
  }

  selectCode(code: Code){
    this.form.patchValue(code);
  }

  clearForm(){
    this.form.reset();
    this.selectedCode = null;
  }

  deleteCode(code: Code){
    // console.log("deleteCode:",code );
    this.codesService.deleteCode(code).
    subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.refresh();
      },
      (err) => {
        this.toastr.error(err.error.details);
      }
    );
  }
}
