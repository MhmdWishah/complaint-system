import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CodesComponent } from './codes/codes.component';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardsModule } from '../../_metronic/partials/content/cards/cards.module';
import { PrimeModule } from '../settings/prime.module';
import { ToastModule } from 'primeng/toast';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { components } from '../../components/index';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: 'codes',
            component: CodesComponent

          },
          { path: '', redirectTo: 'hostDashboard', pathMatch: 'full' },
          { path: '**', redirectTo: 'hostDashboard' }
        ]
      }
    ]),
    TooltipModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CardsModule,
    PrimeModule,
    ToastModule,
    MatProgressSpinnerModule
  ],
  declarations: [CodesComponent],
  exports: [],
})
export class SystemSettingsModule {
}
