import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpErrorsInterceptor } from "./httpErrors.interceptor";
import { MessageInterceptor } from './message.interceptor';

export const interceptors = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MessageInterceptor, multi: true },
];
