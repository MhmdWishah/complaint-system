import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { RolesService } from './roles.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  providers: [MessageService],
})
export class RolesComponent implements OnInit {
  dataRoles$: Observable<any>;
  roleSelected: any = { code: 0, Name: '' };
  roleDeleted: any;
  IsEditName: boolean = false;
  constructor(
    private service: RolesService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getDataRoles();
    this.dataRoles$ = this.service.roles$;
    // this.refreshDataRoles();
  }

  getDataRoles() {
    this.service.getDataRoles();
  }

  AddOrEditOrdeleteRoles(type: number) {
    console.log(this.roleSelected);
    var body: any;
    switch (type) {
      case 1:
        body = {
          permissionID: '4',
          RoleName: 'دور جديد',
        };
        break;
      case 2:
        body = {
          RoleID: this.roleSelected.code,
          RoleName: this.roleSelected.Name,
          permissionID: this.service.selectedFile
            .map((value) => value.ID)
            .join(','),
        };
        break;
      case 3:
        body = {
          RoleID: this.roleDeleted.code,
          RoleName: this.roleDeleted.Name,
          permissionID: '',
        };
        break;
    }
    this.service
      .AddRoleOrSaveNewPerORDelete(body)
      .pipe(
        map((value) => {
          return value.toString().split('|');
        })
      )
      .subscribe(
        (res: any) => {
          if (type != 2) {
            this.getDataRoles();
          }
          this.toastr.success(res[1]);
        },
        (err) => {
          this.toastr.error('خطا غير معروف');
        }
      );
  }
  GetDataById(roleSelected: any) {
    this.roleSelected = roleSelected;
    this.service.GetPermissionsById(roleSelected.code, {
      ID: roleSelected.code,
      Name: roleSelected.Name,
    });
  }
}
