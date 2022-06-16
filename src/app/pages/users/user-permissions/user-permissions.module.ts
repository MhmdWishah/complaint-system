import { TreeModule } from 'primeng/tree';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPermissionsComponent } from './user-permissions.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastModule } from 'primeng/toast';
import { CardsModule } from '../../../_metronic/partials/content/cards/cards.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { TooltipModule } from 'primeng/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { usersServices } from '../services/index';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TreeMultiSelectionForUserPerComponent } from './tree-multi-selection-perForUser/tree-multi-selection.component';
@NgModule({
  declarations: [UserPermissionsComponent,TreeMultiSelectionForUserPerComponent],
  imports: [
    TooltipModule,
    CommonModule,
    InlineSVGModule,
    CardsModule,
    ToastModule,
    MatProgressSpinnerModule,
    ProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    TranslateModule.forChild(),
    MatChipsModule,
    MatIconModule,
    MatTreeModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    TreeModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserPermissionsComponent,
      },
    ]),
  ],
  providers: [usersServices]
})
export class UserPermissionsModule {}
