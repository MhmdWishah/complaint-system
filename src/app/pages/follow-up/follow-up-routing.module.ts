import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../modules/auth/services/auth.guard';

export const routes: Routes = [
    {
        path: 'MyFollowUps/:id',
        loadChildren: () =>
            import('./my-follow-ups/my-follow-ups.module').then((m) => m.MyFollowUpsModule),
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FollowUpRoutingModule {}
