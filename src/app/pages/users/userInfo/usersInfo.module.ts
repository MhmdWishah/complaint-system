import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimeModule } from '../../settings/prime.module';
import { CardsModule } from '../../../_metronic/partials/content/cards/cards.module';
import { ToastModule } from 'primeng/toast';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsModule } from '../../../components/components.module';
import { UsersInfoComponent } from './users-info.component';
import { usersServices } from '../services/index';

@NgModule({
  imports: [

    TooltipModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CardsModule,
    PrimeModule,
    ToastModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatDatepickerModule,
    MatIconModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersInfoComponent,
      },
    ]),
  ],
  declarations: [UsersInfoComponent],
  exports: [],
  providers: [usersServices],
})
export class UsersInfoModule {}
