import { NgModule } from '@angular/core';
import { ComplaintPursueComponent } from './complaint-pursue.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../../components/components.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CardsModule } from '../../../_metronic/partials/content/cards/cards.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ComplaintInfoComponent } from '../components/complaint-info/complaint-info.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        CardsModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        ComponentsModule,
        MatTabsModule,
        RouterModule.forChild([
            {
                path: '',
                component: ComplaintPursueComponent
            }
        ])
    ],
    exports: [ComplaintInfoComponent],
    declarations: [ComplaintPursueComponent,ComplaintInfoComponent],
    providers: [],
})
export class ComplaintPursueModule { }
