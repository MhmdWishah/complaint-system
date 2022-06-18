import { NgModule } from '@angular/core';
import { ComplaintsRoutingModule } from './complaints-routing.module';
import { CommonModule } from '@angular/common';
import { ComplaintModelService } from './services/complaint-model.service';
import { ComplaintsServices } from './services';
import { ComplaintInfoComponent } from './components/complaint-info/complaint-info.component';


@NgModule({
    imports: [
        ComplaintsRoutingModule,
        CommonModule
    ],
    exports: [],
    declarations: [],
    providers: [ComplaintsServices],
})
export class ComlaintsModule { }
