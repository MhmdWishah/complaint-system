import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { HttpService } from '../../../modules/auth/services/http.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { User, UserData } from '../models/users.model';
import { ConvertObjectToHttpParams } from 'src/app/functions/convertObjectToHttpParams';

@Injectable({providedIn: 'any'})
export class UsersInfoService {

  private readonly baseUrl: string = environment.baseUrl + "/user";

  private userData = new BehaviorSubject<User|undefined>(undefined);

  private AllUsersData = new BehaviorSubject<UserData[]|undefined>(undefined);


  constructor(
    private httpp:HttpService,
    private http: HttpClient,
    private auth: AuthService
  ) { }


  getUser(userID: number) {
    this.http.get<User[]>(this.baseUrl + `?ID=${userID}`, {
        headers: this.auth.getHeaders()
    }).subscribe(value=>{
      this.userData.next({...value[0], IDNumber: value[0].IDNO});
    });
  }

  get userData$() {
    return this.userData.asObservable();
  }

  saveUser(user: User) {
    return this.http.post(this.baseUrl, user, {
      headers: this.auth.getHeaders()
    })
  }

  getAllUsers(obj:{Department:string, UserGroup:number, Active:boolean}) {
    const params = ConvertObjectToHttpParams(obj);
    this.http.get<UserData[]>(this.baseUrl + "/All", {
      params: params,
      headers: this.auth.getHeaders()
    }).subscribe( (response: UserData[]) =>{
      this.AllUsersData.next(response);
    });
  }

  get AllUsersData$(){
    return this.AllUsersData.asObservable();
  }

  deleteUser(user: UserData) {
    const params = ConvertObjectToHttpParams({ID: user.UserID});
    return this.http.delete(this.baseUrl, {
      params: params,
      headers: this.auth.getHeaders()
    });
  }

}
