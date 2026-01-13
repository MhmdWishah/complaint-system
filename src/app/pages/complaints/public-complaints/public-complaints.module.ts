import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Material Modules
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// PrimeNG Modules
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

// Custom Modules
import { ComponentsModule } from '../../../components/components.module';

// Component
import { PublicComplaintsComponent } from './public-complaints.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule,
        DialogModule,
        ButtonModule,
        ComponentsModule,
        RouterModule.forChild([
            {
                path: '',
                component: PublicComplaintsComponent
            }
        ])
    ],
    declarations: [PublicComplaintsComponent],
    providers: []
})
export class PublicComplaintsModule { }
