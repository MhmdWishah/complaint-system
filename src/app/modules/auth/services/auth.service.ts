import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize, tap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields

  private authLocalStorageToken = `token`;
  private baseUrl: string = environment.baseUrl + "/token";

  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<any>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    private http: HttpClient,

  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }


  login(userName: string, password: string, appID?: number | string) {
      this.isLoadingSubject.next(true);
    this.http
      .post(this.baseUrl, { username: userName, Password: password })
      .pipe(
        tap((res: any) => {
          this.saveUser(res, userName, appID);
          this.currentUserSubject.next(res);
        }),
        catchError((error: any) => {
          return of();
        }),
        finalize(() => this.isLoadingSubject.next(false))
      )
      .subscribe();
  }
  saveUser(res: any, userName?: string, appID?: number | string) {

    if (res?.token) {
      // console.log('res', res);
      this.logout();
      localStorage.setItem(this.authLocalStorageToken, res.token);
      localStorage.setItem("fullName", res.fullName);
      localStorage.setItem("empID", res.empNo);
      localStorage.setItem("center", res.center);
      localStorage.setItem("userID", res.userID);
      localStorage.setItem("departmentTxt", res.departmentTxt);
      localStorage.setItem("lang", res.lang);
      localStorage.setItem("description", res.description);

      // if (userName == "public") this.router.navigate(["/jobs/app/" + appID]);
      // else {
      // localStorage.removeItem("public");
      if (userName) {
        // console.log("hi", userName)
        localStorage.setItem("userName", res.userName);
        this.router.navigateByUrl("/dashboard");
      }
    }
    else {
      // this.toastr.error(res.message);
    }
  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);

    this.router.navigate(['/auth/login']);
  }
  get isActive() {
    return !!localStorage.getItem("token");
  }




  // need create new user then login
  registration(user: UserModel)
    :
    Observable<any> {
    this.isLoadingSubject.next(true);
    return of(undefined);

    // this.authHttpService.createUser(user).pipe(
    //   map(() => {
    //     this.isLoadingSubject.next(false);
    //   }),
    //   switchMap(() =>
    //   this.login(user.email, user.password))
    //   ,
    //   catchError((err) => {
    //     console.error('err', err);
    //     return of(undefined);
    //   }),
    //   finalize(() => this.isLoadingSubject.next(false))
    // );
  }

  getHeaders() {
    return new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem(this.authLocalStorageToken),
    });
  }
  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.token) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth.token));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    // this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
