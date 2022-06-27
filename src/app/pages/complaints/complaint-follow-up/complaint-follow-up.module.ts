import { NgModule } from '@angular/core';
import { ComplaintFollowUpComponent } from './complaint-follow-up.component';
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
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { FollowUpTemplateComponent } from '../components/follow-up-template/follow-up-template.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { ComplaintCommissionComponent } from '../components/complaint-commission/complaint-commission.component';

const components = [
    ComplaintInfoComponent, FollowUpTemplateComponent, ComplaintCommissionComponent
];
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
        MatChipsModule,
        MatFormFieldModule,
        MatExpansionModule,
        CdkAccordionModule,
        RouterModule.forChild([
            {
                path: '',
                component: ComplaintFollowUpComponent
            }
        ])
    ],
    exports: [components],
    declarations: [ComplaintFollowUpComponent, components],
    providers: [],
})
export class ComplaintFollowUpModule { }
