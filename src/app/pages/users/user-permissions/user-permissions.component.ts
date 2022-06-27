import { RolesService } from './../roles/roles.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { switchMap, startWith, map } from 'rxjs/operators';
import { CommonService } from '../../../services/common.service';
import { AutoCompleteUser } from '../models/users.model';
import { UserPermissionsService } from '../services/user-permissions.service';
import { UserRole, Role, SaveRolePayload } from '../models/roles.model';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/models/common-response.model';

@Component({
  selector: 'user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.scss'],
})
export class UserPermissionsComponent implements OnInit, OnDestroy {
  searchedUsers$: Observable<AutoCompleteUser[]>;
  userSearchControl = new FormControl(null);

  selectedUser: AutoCompleteUser;
  selectedUserRole$: Observable<UserRole[] | undefined>;

  searchedRoles$: Observable<Role[]> = of([]);
  roleSearchControl = new FormControl(null);

  form = new FormGroup({});
  dataRoles$: Observable<any[]>;
  constructor(
    private userPermissionsService: UserPermissionsService,
    private commonSerive: CommonService,
    private toastr: ToastrService,
    private serviceRole: RolesService
  ) {}

  ngOnInit() {
    this.initSearchForUsers();
    this.initSearchForRoles();
    this.selectedUserRole$ = this.userPermissionsService.UserRole$;
    this.dataRoles$ = this.serviceRole.roles$;
    this.serviceRole.getDataRoles();
  }

  onSelectionUserChange(user: AutoCompleteUser) {
    // console.log('user', user);
    this.selectedUser = user;
    this.userPermissionsService.getPerUser(user.UserID);
    this.userPermissionsService.getUserRole(user.UserID);
    this.userSearchControl.setValue(null);
  }

  private initSearchForUsers() {
    this.searchedUsers$ = this.userSearchControl.valueChanges.pipe(
      startWith(''),
      switchMap((value) =>
        value ? this.commonSerive.search('Users', value) : of([])
      )
    );
  }

  private initSearchForRoles() {
    this.searchedRoles$ = this.roleSearchControl.valueChanges.pipe(
      startWith(''),
      switchMap((value) =>
        value ? this.commonSerive.search('usersRoleName', value) : of([])
      )
    );
  }

  addRole(role: Role){
    if(!!role.code && !!this.selectedUser!.UserID){
    const obj: UserRole = {RoleID: role.code, UserID :this.selectedUser!.UserID!, RoleName: role.Name};
      this.userPermissionsService.saveUserRole(obj)
      .subscribe(
        (response: Response|undefined) => {
          if((response!.status!) > 0){
            // console.log(response)
            this.roleSearchControl.reset("");
            const ele: any = document!.getElementById("chipListInput");
            ele.value = "";
          }
        });
    }
  }

  removeRole(userRole: UserRole){
    if(!!userRole.RoleID && !!this.selectedUser!.UserID && !!userRole!.UserID){
      const obj: {forUserID: number; roleID: number;} = {
        roleID: userRole.RoleID,
        forUserID :this.selectedUser!.UserID!
      };

      this.userPermissionsService.removeUserRole(obj).
      subscribe(
        (response: Response|undefined) => {
          if(response!.status > 0){
            
          }
        });
    }
  }

  saveNewRoleForUser(RoleID: any) {
    this.userPermissionsService
      .saveNewRoleForUser({
        RoleID: RoleID,
        userID: this.selectedUser?.UserID,
      })
      .subscribe(
        (res: Response|undefined) => {
          if(res!.status! > 0){
            this.userPermissionsService.getUserRole(this.selectedUser.UserID);
            this.userPermissionsService.getPerUser(this.selectedUser.UserID); 
          }
          
        }
      );
  }
  
  ngOnDestroy(): void {
    this.serviceRole.rolesSub.next(false);
  }
}
