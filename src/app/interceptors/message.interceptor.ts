import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HandleStringResponse } from '../functions/handleStringResponse';

@Injectable()
export class MessageInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if(!!event!.body && (event!.body!.status || event!.body!.rv)){
              if((event!.body!.status > 0 || event!.body!.rv > 0)) {
                this.toastr.success(event!.body!.message);
              }else if(event!.body!.rv < 1 || event!.body!.status < 1){
                this.toastr.error(event!.body!.message!);
              }
            }else if(typeof (event!.body!) === 'string'){
              const response = HandleStringResponse(event!.body);
              if(response!.status! > 0) {
                this.toastr.success(response!.message);
              }else if(response!.status! < 1){
                this.toastr.error(response!.message!);
              }
            }
          }
        }
      ));
    }
}
