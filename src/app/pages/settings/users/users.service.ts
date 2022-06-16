import { environment } from './../../../../environments/environment';
import { AuthService } from './../../../modules/auth/services/auth.service';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './../../../modules/auth/services/http.service';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class UsersService {
  constructor(private http: HttpService, private httpp: HttpClient, private auth: AuthService) { }
  private readonly baseUrl: string = environment.baseUrl;
  getUsers() {
    return this.http.getData('/Users');
  }
  addUser(body: any) {
    return this.http.saveData("/Users", body)
  }
  getUserById(id: any) {
    return this.http.getData(`/Users?UserID=${id}`);
  }
  saveImageProfile(Img: File, id: any) {
    let formData = new FormData();
    formData.append("Avatar", Img)
    formData.append("UserID", id)


    console.log("img", Img)
    return this.httpp.post(this.baseUrl + "/UsersProfile/Avatar", formData, { headers: this.auth.getHeaders() });
  }
  userTypeId(body: any) {
    return this.http.saveData("/Users/UsersType", body)
  }
  userStatusId(body: any) {
    return this.http.saveData("/Users/UserStatus", body)
  }
  isEmailNotification(body: any) {
    return this.http.saveData("/Users/EmailNotification", body)
  }

  getCodeUsers(){
    return this.http.getData("/Code?ScreenName=users")
  }
  UsersLocationRoles(body: any) {
    return this.http.saveData("/Users/UsersLocationRoles", body)
  }

  deleteRoleLoc(UserID:any,LocationId:any,RoleId:any){

    return this.http.deleteDate(`/Users/UsersLocationRoles?UserID=${UserID}&LocationId=${LocationId}&RoleId=${RoleId}`)

   }
}
