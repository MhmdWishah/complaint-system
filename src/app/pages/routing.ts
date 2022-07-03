import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then(m => m.UsersModule),
  },
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
