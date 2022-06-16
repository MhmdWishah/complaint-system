import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserPermissionsComponent } from './user-permissions/user-permissions.component';
import {usersServices} from "./services/index";


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: 'role',
            loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule)

          },
          {
            path: '',
            loadChildren: () => import('./userInfo/usersInfo.module').then(m => m.UsersInfoModule)
          },
          {
            path: 'permissions',
            loadChildren: () => import('./user-permissions/user-permissions.module').then(m => m.UserPermissionsModule)

          }
        ]
      }
    ]),
    CommonModule
  ],
  providers: [
    usersServices
  ]
})
export class UsersModule { }
