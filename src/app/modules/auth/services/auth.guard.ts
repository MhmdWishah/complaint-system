import { switchMap, map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
    private http: HttpService,
    private router: Router,
    private toastr: ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.isActive) {
      if(state.url.includes('/auth/login')){
        return true;
      }else{
        this.router.navigate(['/auth/login']);
        return false;
      }
    }else{
      if(state.url.includes('/auth/login')){
        this.router.navigate(['/']);
      }
      return true;
    }
  //   const url = state.url
  //     .split("?")[0]
  //     .split("/")
  //     .filter((item) => {
  //       return !/^-?[0-9]\d*(\.\d+)?$/.test(item);
  //     })
  //     .join("/");

  //   if (route.queryParams?.token)
  //     return this.http
  //       .getData(`/token?jwtToken=${route.queryParams.token}`)
  //       .pipe(
  //         switchMap((res) => {
  //           this.auth.saveUser(res);
  //           this.router.navigate(state.url.split("?")[0].split("/"));
  //           return this.checkAuth(url);
  //         })
  //       );
  //   else return this.checkAuth(url);
  // }

  // private checkAuth(url: string) {
  //   return this.http.getData(`/User/HasPermission?Url=${url}`).pipe(
  //     map((res: any) => {
  //       if (res?.rv == 0) {
  //         this.toastr.error("هذا المستخدم لايمتلك صلاحية للدخول لهذه الشاشة");
  //         this.router.navigate(["/dashbord"]);
  //       }
  //       return true;
  //     }),
  //     catchError((error) => {
  //       if (error.status == 401) {
  //         // check for vaild token
  //         this.toastr.error("لقد انتهت جلستك الرجاء تسجيل الدخول");
  //         localStorage.removeItem("token");
  //       }
  //       this.router.navigate(["/public/login"]);
  //       return of(false);
  //     })
  //   );

}}
