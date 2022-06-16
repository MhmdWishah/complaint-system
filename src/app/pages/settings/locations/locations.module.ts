import { modalAddLocation } from './modalLocation/modalAddLocation/modalAddLocation.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { PrimeModule } from './../prime.module';
import { TooltipModule } from 'primeng/tooltip';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { locationsComponent } from './locations.component';
import { modalClickLocNameComponent } from './modalLocation/modalClickLocName/modalClickLocName.component';
import { modalDeleteComponent } from './modalLocation/modalDelete/modalDelete.component';
import { modalEmailComponent } from './modalLocation/modalEmail/modalEmail.component';
import { modalEditComponent } from './modalLocation/modalEdit/modalEdit.component';
import {DialogModule} from 'primeng/dialog';


@NgModule({
  declarations: [
    locationsComponent,modalAddLocation,modalClickLocNameComponent,modalDeleteComponent,modalEmailComponent,modalEditComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: locationsComponent
      }
    ]),
    TooltipModule,
    InlineSVGModule,
    PrimeModule,
    DialogModule]
})
export class locationsModule {

  display: boolean = false;

  showDialog() {
      this.display = true;
  }

}
