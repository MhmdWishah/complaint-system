import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private toastr: ToastrService
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap(
            (event: HttpEvent<any>) => { 
              
            },
            (event: any) => {
                if (event instanceof HttpErrorResponse) {
                  console.log(event)
                    switch (event.status) {
                        // not authorized
                        case (401):
                          this.router.navigate(["/auth/login"]);
                          // window.location.href = environment.apiBaseUrl + "portal/auth/login";
                            break;
                        // not found
                        case (404):
                            this.router.navigate(['/notFound']);
                            break;
                        // something wrong in the back end
                        case (400):
                          this.toastr.error(event!.error!.title, event!.statusText)
                          break;
                        // something wrong in the back end
                        case (422):
                          this.toastr.error(event!.error!.details, event!.error!.message)
                          break;

                        case (500):
                          this.toastr.error(event!.error!.details, event!.error!.message)
                          break;

                    }
                }
        }));
    }
}
