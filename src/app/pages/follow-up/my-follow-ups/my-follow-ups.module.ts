import { NgModule } from '@angular/core';
import { MyFollowUpsComponent } from './my-follow-ups.component';
import { RouterModule } from '@angular/router';
import { ComplaintsServices } from '../../complaints/services';
import { ComponentsModule } from '../../../components/components.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CardsModule } from '../../../_metronic/partials/content/cards/cards.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyFollowUpTemplateComponent } from '../components/my-follow-up-template/my-follow-up-template.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        CardsModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        ComponentsModule,
        MatExpansionModule,
        CdkAccordionModule,
        RouterModule.forChild([
            {
                path: '',
                component: MyFollowUpsComponent
            }
        ])
    ],
    exports: [MyFollowUpTemplateComponent],
    declarations: [MyFollowUpsComponent, MyFollowUpTemplateComponent],
    providers: [ComplaintsServices],
})
export class MyFollowUpsModule { }
