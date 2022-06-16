import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: 'my-profile',
            loadChildren: () =>
              import('./my-profile/my-profile.module').then(
                (m) => m.MyProfileModule
              ),
          },
          {
            path: 'configurations',
            loadChildren: () =>
              import('./configurations/configurations.module').then(
                (m) => m.ConfigurationsModule
              ),
          },
          {
            path: 'users',
            loadChildren: () =>
              import('./users/users.module').then((m) => m.usersModule),
          },
          {
            path: 'locations',
            loadChildren: () =>
              import('./locations/locations.module').then(
                (m) => m.locationsModule
              ),
          },

          { path: '', redirectTo: 'hostDashboard', pathMatch: 'full' },
          { path: '**', redirectTo: 'hostDashboard' },
        ],
      },
    ]),
  ],
  declarations: [],
  exports: [],
})
export class SettingModule {}
