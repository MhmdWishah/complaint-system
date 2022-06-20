import { NgModule } from '@angular/core';
import { FollowUpRoutingModule } from './follow-up-routing.module';
import { CommonModule } from '@angular/common';
import { FollowUpServices } from './services';
import { ComplaintsServices } from '../complaints/services/index';


@NgModule({
    imports: [CommonModule, FollowUpRoutingModule],
    exports: [],
    declarations: [],
    providers: [FollowUpServices,ComplaintsServices],
})
export class FollowUpModule { }
