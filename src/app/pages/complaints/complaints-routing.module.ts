import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../modules/auth/services/auth.guard';

export const routes: Routes = [
    {
        path: 'ComplaintModel',
        loadChildren: () =>
            import('./complaint-model/complaint-model.module').then((m) => m.ComplaintModelModule),
    },

    {
        path: 'ComplaintsReview',
        loadChildren: () =>
            import('./complaints-review/complaints-review.module').then((m) => m.ComplaintsReviewModule),
    },

    {
        path: 'ComplaintFollowUp/:id',
        loadChildren: () =>
            import('./complaint-follow-up/complaint-follow-up.module').then((m) => m.ComplaintFollowUpModule),
    },

    {
        path: 'PublicComplaints',
        loadChildren: () =>
            import('./public-complaints/public-complaints.module').then((m) => m.PublicComplaintsModule),
    },
    // {
    //     path: '/Complaint',
    //     redirectTo: '/ComplaintModel',
    //     pathMatch: 'full',
    // },
    // {
    //     path: '/complaint',
    //     redirectTo: '/ComplaintModel',
    //     pathMatch: 'full',
    // },
    // {
    //     path: '/Complaints',
    //     redirectTo: '/ComplaintsActions',
    //     pathMatch: 'full',
    // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplaintsRoutingModule {}
