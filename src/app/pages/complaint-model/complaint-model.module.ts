import { NgModule } from '@angular/core';
import { ComplaintModelComponent } from './complaint-model.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardsModule } from '../../_metronic/partials/content/cards/cards.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ComponentsModule } from '../../components/components.module';
import { MatIconModule } from '@angular/material/icon';
import { ComplaintModelService } from './complaint-model.service';


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
        ComponentsModule,
        RouterModule.forChild([
            {
                path: '',
                component: ComplaintModelComponent
            }
        ])
    ],
    exports: [],
    declarations: [ComplaintModelComponent],
    providers: [ComplaintModelService],
})
export class ComplaintModelModule { }
