import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CalendarModule } from 'primeng/calendar';
import { InlineSVGModule } from 'ng-inline-svg';
import { PrimeModule } from './../prime.module';
import { ConfigurationsComponent } from './configurations.component';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    ConfigurationsComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ConfigurationsComponent
      }
    ]),
    PrimeModule,
    CommonModule,
    FormsModule,
    InlineSVGModule,
    TooltipModule,
  ReactiveFormsModule,
  CalendarModule,
     BsDatepickerModule.forRoot(),
     MatTabsModule]
})
export class ConfigurationsModule {

}
