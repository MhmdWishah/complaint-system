import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { SaveRolePayload, UserRole } from '../models/roles.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConvertObjectToHttpParams } from '../../../functions/convertObjectToHttpParams';
import { HandleStringResponse } from 'src/app/functions/handleStringResponse';

@Injectable({ providedIn: 'root' })
export class UserPermissionsService {
  private readonly baseUrl: string = environment.baseUrl + '/user';

  private userRole = new BehaviorSubject<UserRole[] | undefined>(undefined);
  private userPer = new BehaviorSubject<any>({});

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private auth: AuthService
  ) {}

  getUserRole(userID: number) {
    this.http
      .get<UserRole[]>(this.baseUrl + `/role?ForUserID=${userID}`, {
        headers: this.auth.getHeaders(),
      })
      .subscribe((userRole) => {
        this.userRole.next(userRole);
      });
  }

  get UserRole$(): Observable<UserRole[] | undefined> {
    return this.userRole.asObservable();
  }

  AddUserRoleToUserRolesLocally(newRole:UserRole) {
    if(!!this.userRole.value && (typeof (this.userRole.value!) === 'object' && this.userRole.value!.length! > 0)){
      const newArray: UserRole[] = [...this.userRole!.value!, newRole]
      this.userRole.next([...newArray]);
    } else {
      this.userRole.next([{ ...newRole }]);
    }
  }

  RemoveUserRoleFromUserRolesLocally(removedRole: {forUserID: number; roleID: number;}) {
    if(!!this.userRole.value && (typeof (this.userRole.value!) === 'object' && this.userRole.value!.length! > 0)){
      const newArray: UserRole[] = this.userRole!.value!.filter(userRole => (userRole.RoleID != removedRole.roleID));
      this.userRole.next([...newArray]);
    }else{
      this.userRole.next([]);
    }
  }

  saveUserRole(role: UserRole) {
    return this.http.post(this.baseUrl + "/role", role, {
      headers: this.auth.getHeaders()
    }).pipe(map((response:any) => {
      if(typeof (response) === 'string'){
        const handledResponse = HandleStringResponse(response);
        if(!!handledResponse){
          if(handledResponse.status > 0){
            this.AddUserRoleToUserRolesLocally(role);
          }
          return handledResponse;
        }
      }
    }))
  }

  removeUserRole(role: { forUserID: number; roleID: number }) {
    const params: HttpParams = ConvertObjectToHttpParams(role);
    return this.http.delete(this.baseUrl + '/role', {
      headers: this.auth.getHeaders(),
      params: params,
    }).pipe(map((response) => {
      if(typeof (response) === 'string'){
        const handledResponse = HandleStringResponse(response);
        if(!!handledResponse){
          if(handledResponse.status > 0){
            this.RemoveUserRoleFromUserRolesLocally(role);
          }
          return handledResponse;
        }
      }
    }))

  }
  getPerUser(userID: number) {
    this.userPer.next(false);
    this.http
      .get<any[]>(environment.baseUrl + `/permission?ForUserID=${userID}`, {
        headers: this.auth.getHeaders(),
      })
      .pipe(
        map((dataPer: any) => {
          return dataPer.map((value: any) => {
            return {
              label: value.description,
              key: value.description,
              data: value,
              expandedIcon: 'pi pi-folder-open',
              collapsedIcon: 'pi pi-folder',
              ID: value.id,
              selectable: value.inRole ? false : true,
              ParentId: value.parent == '#' ? 0 : value.parent,
            };
          });
        })
      )
      .subscribe((userRole) => {
        this.userPer.next({ data: userRole, userID: userID });
      });
  }
  get userPer$(): Observable<any> {
    return this.userPer.asObservable();
  }
  saveNewRoleForUser(newRole: any) {
    return this.http.post(this.baseUrl + '/role', newRole, {
      headers: this.auth.getHeaders(),
    }).pipe(map((response) => {
      if(typeof (response) === 'string'){
        const handledResponse = HandleStringResponse(response);
        if(!!handledResponse){
          return handledResponse;
        }
      }
    }));
  }
  saveNewPerForUser(newPer: any) {
    return this.http.post(this.baseUrl + '/permissions', newPer, {
      headers: this.auth.getHeaders(),
    }).pipe(map((response) => {
      if(typeof (response) === 'string'){
        const handledResponse = HandleStringResponse(response);
        if(!!handledResponse){
          return handledResponse;
        }
      }
    }));
  }
}
