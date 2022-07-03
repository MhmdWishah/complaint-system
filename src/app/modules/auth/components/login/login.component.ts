import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  // KeenThemes mock, change it to:
  defaultAuth: any = {
    username: '',
    password: '',
  };

  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  loginSubmit: boolean = false;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
    

    this.authService.currentUser$.subscribe(
      value => {
        this.hasError = false;
        this.f?.username?.setErrors({loginFailed: null});
        this.f?.password?.setErrors({loginFailed: null});
        if(value instanceof HttpErrorResponse){
          this.hasError = true;
          this.f?.username?.setErrors({loginFailed: value.error.message})
          this.f?.password?.setErrors({loginFailed: value.error.message})
        }
      }
    )
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: [
        this.defaultAuth.username,
        Validators.compose([
          Validators.required,
          // Validators.username,
          Validators.minLength(1),
          // Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  login() {
    // this.loginForm.markAsDirty();
    this.loginSubmit = true;
    this.authService.login(this.f.username.value, this.f.password.value);
    //   .login(this.f.email.value, this.f.password.value)
    // this.hasError = false;
    // const loginSubscr = this.authService
    //   .login(this.f.email.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe((user: UserModel | undefined) => {
    //     if (user) {
    //       this.router.navigate([this.returnUrl]);
    //     } else {
    //       this.hasError = true;
    //     }
    //   });
    // this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
    this.loginForm.reset(this.defaultAuth);
    this.hasError = false;
    this.loginSubmit = false;
  }
}
