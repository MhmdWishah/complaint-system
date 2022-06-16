import { HttpService } from './../../../modules/auth/services/http.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RolesService {
  constructor(private http: HttpService) {}
  selectedFile: any[] = [];
  rolesSub = new BehaviorSubject<any>(false);
  perSub = new BehaviorSubject<any>({ data: [], role: { ID: 0, Name: '' } });
  getDataRoles() {
    this.rolesSub.next(false);
    return this.http
      .getData('/common/search', {
        resourceName: 'usersRoleName',
        Key: "''",
      })
      .subscribe((value) => {
        this.rolesSub.next(value);
      });
  }
  get roles$() {
    return this.rolesSub.asObservable();
  }
  GetPermissionsById(id: any, role: any) {
    this.perSub.next(false);
    return this.http
      .getData(`/role/permissions`, { RoleID: id })
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
              ParentId: value.parent == '#' ? 0 : value.parent,
            };
          });
        })
      )
      .subscribe((value) => {
        this.perSub.next({ data: value, role: role });
      });
  }
  get per$() {
    return this.perSub.asObservable();
  }
  AddRoleOrSaveNewPerORDelete(body: any) {
    return this.http.saveData('/role/permission', body);
  }
}
