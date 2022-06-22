import { Routes } from '@angular/router';
import { ConfigurationsComponent } from './settings/configurations/configurations.component';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'ssettings',
    loadChildren: () =>
      import('./settings/setting.module').then(m => m.SettingModule),
  },

  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then(m => m.UsersModule),
  },

  // {
  //   path: 'settings',
  //   loadChildren: () =>
  //     import('./system-settings/system-settings.module').then(m => m.SystemSettingsModule),
  // },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  // {
  //   path: 'crafted/pages/profile',
  //   loadChildren: () =>
  //     import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  // },
  // {
  //   path: 'crafted/account',
  //   loadChildren: () =>
  //     import('../modules/account/account.module').then((m) => m.AccountModule),
  // },
  // {
  //   path: 'crafted/pages/wizards',
  //   loadChildren: () =>
  //     import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  // },
  // {
  //   path: 'crafted/widgets',
  //   loadChildren: () =>
  //     import('../modules/widgets-examples/widgets-examples.module').then(
  //       (m) => m.WidgetsExamplesModule
  //     ),
  // },
  // {
  //   path: 'apps/chat',
  //   loadChildren: () =>
  //     import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  // },
  {
    path: 'Complaints',
    loadChildren: () =>
      import('./complaints/complaints.module').then((m) => m.ComlaintsModule),
  },
  {
    path: 'FollowUp',
    loadChildren: () =>
      import('./follow-up/follow-up.module').then((m) => m.FollowUpModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'Dashboard',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },


  // {
  //   path: 'configurations', // <= Page URL
  //   component: ConfigurationsComponent // <= Page component registration
  // },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
