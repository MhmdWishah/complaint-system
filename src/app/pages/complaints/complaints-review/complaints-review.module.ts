import { ComplaintsReviewComponent } from './complaints-review.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardsModule } from '../../../_metronic/partials/content/cards/cards.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ComponentsModule } from '../../../components/components.module';
import { MatIconModule } from '@angular/material/icon';
import { ComplaintModelService } from '../services/complaint-model.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        CardsModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatDatepickerModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        ComponentsModule,
        RouterModule.forChild([
            {
                path: '',
                component: ComplaintsReviewComponent
            }
        ])
    ],
    exports: [],
    declarations: [ComplaintsReviewComponent],
    providers: [],
})
export class ComplaintsReviewModule { }
