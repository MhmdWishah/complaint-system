import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as moment from 'moment';
import { Response } from 'src/app/models/common-response.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getData(route: string, params: any = null) {
    return this.http.get<any>(this.baseUrl + route, {
      params: this.convartParams(params),
      headers: this.auth.getHeaders(),
    });
  }

  saveData(route: string, body: any){
    return this.http.post(this.baseUrl + route, this.convartData(body), {
      headers: this.auth.getHeaders(),
    });
  }
  saveDataArray(route: string, body: any[]) {
    return this.http.post(this.baseUrl + route, body, {
      headers: this.auth.getHeaders(),
    });
  }
  deleteDate(route: string, params: any = null) {
    return this.http.delete(this.baseUrl + route, {
      params: this.convartParams(params),
      headers: this.auth.getHeaders(),
    });
  }

  getBlob(route: string, params: any = null) {
    return this.http.get(this.baseUrl + route, {
      params: this.convartParams(params),
      headers: this.auth.getHeaders(),
      responseType: 'blob' as 'json',
    });
  }

  getBase46(route: string, params: any = null) {
    return this.http.get(this.baseUrl + route, {
      params: this.convartParams(params),
      headers: this.auth.getHeaders(),
    });
  }

  saveFormDate(route: string, body: any) {
    const data = new FormData();
    Object.keys(body).forEach((key) => {
      if (body[key] instanceof Date)
        body[key] = moment(body[key]).format('YYYY-MM-DD');
      if (body[key] instanceof Array) {
        body[key].forEach((element: any) => {
          data.append(key, element);
        });
      } else {
        data.append(key, body[key]);
      }
    });

    return this.http.post(this.baseUrl + route, data, {
      headers: this.auth.getHeaders(),
    });
  }

  private convartData(body: any) {
    let newValue = { ...body };
    Object.keys(newValue).forEach((key) => {
      if (moment.isMoment(newValue[key]))
        newValue[key] = newValue[key].toDate();
      if (newValue[key] instanceof Date)
        newValue[key] = moment(newValue[key]).format('YYYY-MM-DD');
      if (newValue[key] == null) delete newValue[key];
    });
    return newValue;
  }

  private convartParams(params: any): any {
    if (params) {
      let newParams = this.convartData(params);
      let httpParams = new HttpParams();
      Object.keys(newParams).forEach(function (key) {
        httpParams = httpParams.set(key, newParams[key]);
      });
      return httpParams;
    } else {
      return null;
    }
  }
}
