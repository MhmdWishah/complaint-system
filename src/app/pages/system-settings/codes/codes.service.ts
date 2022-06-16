import { AuthService } from 'src/app/modules/auth';
import { ToastrService } from 'ngx-toastr';
import { take, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../../environments/environment.prod';
import { CodeTable, Code } from '../system-settings.model';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CodesService {
  readonly baseUrl: string = environment.baseUrl + "/code"

  private isCodesFetching = new BehaviorSubject<boolean>(false);

  private isTablesFetching = new BehaviorSubject<boolean>(false);

  private dataTables = new BehaviorSubject<any>(undefined);
  private dataTableCodes = new BehaviorSubject<any>(undefined);



  get tablesLoading$() {
    return this.isTablesFetching.asObservable();
  }
  get CodesLoading$() {
    return this.isCodesFetching.asObservable();
  }

  setTablesLoading(value:boolean) {
    this.isTablesFetching.next(value);
  }
  setCodesLoading(value:boolean) {
    this.isCodesFetching.next(value);
  }

  constructor(
      private http: HttpClient,
      private toastr: ToastrService,
      private auth: AuthService
  ) { }

  // get screen codes
  getPageCodes(pageName: string) {
    return this.http.get<any>(this.baseUrl + `/page?PageName=${pageName}`, {
      headers: this.auth.getHeaders()
    })
  }

  // get tables
  getTables() {
    this.dataTables.next(undefined)
     this.http.get<CodeTable[]>( this.baseUrl + "/constantAll", {
      headers: this.auth.getHeaders()
    }).subscribe(value=>{
      this.dataTables.next(value);
    })
  }

  get dataTables$() {
    return this.dataTables.asObservable();
  }

  // get table codes
  getTableCodes(table: string) {
    this.dataTableCodes.next(undefined)
     this.http.get<Code[]>(this.baseUrl + `/constant?TableName=${table}`, {
      headers: this.auth.getHeaders()
    }).subscribe(value=>{
      this.dataTableCodes.next(value)
    })
  }

  get dataTableCodes$() {
    return this.dataTableCodes.asObservable();
  }


  //saveCode
  saveCode(code: Code) {
    return this.http.post(this.baseUrl + "/constant", code, {
      headers: this.auth.getHeaders()
    });
  }

  // delete code
  deleteCode(code: Code) {
    return this.http.delete(this.baseUrl + `/constant?TableName=${code.tableName}&Code=${code.code}`, {
      headers: this.auth.getHeaders()
    });
  }
}
