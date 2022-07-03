import { HttpService } from './modules/auth/services/http.service';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import {MatIconModule} from '@angular/material/icon';


// #fake-start#
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';
import { interceptors } from './interceptors/index';
import { GlobalServices } from './services';
import { NotificationsService } from './services/notifications.service';
import { SignalRService } from './services/signalr.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
// #fake-end#

function appInitializer(authService: AuthService,notificationsService:NotificationsService, signalRService:SignalRService,) {
  return () => {
    () => notificationsService.SearchNotifications();
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    TooltipModule,
    RippleModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-left',
      // preventDuplicates: true,
    }),
    // #fake-start#

    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    BsDatepickerModule.forRoot(),
    MatIconModule

  ],
  providers: [
    [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },         
    { provide: LOCALE_ID, useValue: "en-GB" }],
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService, SignalRService, NotificationsService],
    },
    interceptors,
    // GlobalServices
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
