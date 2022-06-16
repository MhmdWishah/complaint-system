import { HttpService } from './modules/auth/services/http.service';
import { NgModule, APP_INITIALIZER } from '@angular/core';
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
import { FakeAPIService } from './_fake/fake-api.service';
import { ConfigurationsComponent } from './pages/settings/configurations/configurations.component';
import { MyProfileComponent } from './pages/settings/my-profile/my-profile.component';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';
import { interceptors } from './interceptors/index';
// #fake-end#

function appInitializer(authService: AuthService) {
  return () => {

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
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    BsDatepickerModule.forRoot(),
    MatIconModule

  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    interceptors
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}