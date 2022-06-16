import { TreeModule } from 'primeng/tree';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CardsModule } from './../../../_metronic/partials/content/cards/cards.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { TooltipModule } from 'primeng/tooltip';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TreeMultiSelectionForThePerComponent } from './tree-multi-selection-Roles/tree-multi-selection.component';

@NgModule({
  declarations: [RolesComponent,TreeMultiSelectionForThePerComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RolesComponent,
      },
    ]),
    TooltipModule,
    CommonModule,
    InlineSVGModule,
    CardsModule,
    ToastModule,
    MatProgressSpinnerModule,
    ProgressSpinnerModule,
    FormsModule,
    TranslateModule.forChild(),
    TreeModule
  ],
})
export class RolesModule {}
