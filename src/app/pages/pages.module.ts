import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { Routing } from './routing';
import { TranslationModule } from '../modules/i18n/translation.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatNativeDateModule } from '@angular/material/core';
// const routes: Routes = [
//   {
//     path: '',
    // children: Routing,
//   },
// ];

@NgModule({
  imports: [
    CommonModule,
    TranslationModule,
    TranslateModule,
    // RouterModule.forChild(routes),
    MatNativeDateModule,
  ],
  declarations: [],
  exports: [RouterModule],
  providers: [],
})
export class PagesModule { }
