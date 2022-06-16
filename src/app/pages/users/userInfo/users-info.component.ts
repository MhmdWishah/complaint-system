import { UsersInfoService } from '../services/users-info.service';
import { Component, OnChanges, OnInit, SimpleChanges, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { CustomPasswordValidators } from 'src/app/validators/CustomPasswordValidators';
import { ActivatedRoute } from '@angular/router';
import { DefaultUser, User, UserData, AutoCompleteUser } from '../models/users.model';
import { CodesService } from '../../system-settings/codes/codes.service';

@Component({
  selector: 'users-info',
  templateUrl: './users-info.component.html'
})

export class UsersInfoComponent implements OnInit, OnDestroy, AfterViewInit {
  form: FormGroup;

  searchedUsers$: Observable<AutoCompleteUser[]>;
  userSearchControl = new FormControl(null);
  submitted: boolean = false;

  userID: number|null = null;

  emps$: Observable<any[]>;
  selectedEmp: { Code: number; Name: string }|null = null;
  SearchForm = new FormGroup({
    Department: new FormControl(null),
    UserGroup: new FormControl(null),
    Active: new FormControl(null),
  });

  userDataSubscription: Subscription;
  codes$: Observable<any>;


  allUsersData$: Observable<UserData[]|undefined>;

  constructor(
    private commonSerive: CommonService,
    private usersInfoService: UsersInfoService,
    public fb: FormBuilder,
    private codesService: CodesService,
    private toastr: ToastrService,
    )
  {
    this.initForm();
  }

  ngAfterViewInit(): void {
    
  }
  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }

  ngOnInit() {
    this.initSearchForUsers();
    this.initSearchForEmps();
    this.allUsersData$ = this.usersInfoService.AllUsersData$;
    this.userDataSubscribe();
    this.initCodes();
  }

  private initForm() {
    this.form = this.fb.group({
      "UserName": ["", [Validators.required]],
      "FullName": ["", [Validators.required]],
      "IDNumber": ["", [Validators.required]],
      "Email": ["", Validators.compose([Validators.required, Validators.email])],
      "Mobile": ["0", Validators.compose([Validators.required])],
      "Password": ["", Validators.compose([Validators.required])],
      "ConfirmPassword": ["", Validators.compose([Validators.required])],
      "Department": ["", [Validators.required]],
      "StaffNo": [""],
      "UserGroup": ["", [Validators.required]],
      "Description": ["",[]],
      "Active": [""],
      "LimitDate": [""],
    },
      {validator:  CustomPasswordValidators.mustMatch('Password', 'ConfirmPassword')}
    )
  }

  private initSearchForUsers() {
    this.searchedUsers$ = this.userSearchControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => value ? this.commonSerive.search('Users', value) : of([]))
    );
  }

  private initSearchForEmps() {
    this.emps$ = this.form.controls['StaffNo']!.valueChanges.pipe(
      startWith(''),
      switchMap((key: string) => {
          if (!key || !this.selectedEmp?.Name || key != this.selectedEmp.Name)
            this.selectedEmp = null;
          return key ? this.commonSerive.search("Employees", key) : of([]);
      }),
    )
  }

  private userDataSubscribe (){
    this.userDataSubscription = this.usersInfoService.userData$.subscribe(
      (userData: User|undefined) => {
        // console.log("userDataSubscription:",userData)
        // this.form!.reset();
        this.userID = null;
        this.selectedEmp = null;
        if(!!userData){
          this.selectedEmp = {Code: userData!.EmpID!, Name: userData!.FullName!};
          this.userID = userData!.UserID!;
          this.form.patchValue(userData);
          this.form!.patchValue({
            "ConfirmPassword": userData!.Password,
            "StaffNo": userData!.FullName,
          });
        }
      }
    );
  }

  private initCodes(){
    this.codes$ = this.codesService.getPageCodes("users");
  }

  onSelectionUserChange(data:any){

    this.usersInfoService.getUser(data.UserID);
    this.userSearchControl.reset();
  }

  onSelectionEmpChange(item: any) {
    this.selectedEmp = item;
  }

  save(){
    this.submitted = true;

    // GetFormValidationErrors(this.form);

    if (this.form.valid) {
      const user: User = {
        ...this.form.value,
        ID: this.userID!,
        UserID: this.userID!,
        StaffNo: this.selectedEmp?.Code,
      }

      this.usersInfoService.saveUser(user).subscribe(
        (value:any) => {
          if(value!.status! > 0){
            this.clear();
            this.fetchUsers();
          }
        },
      );
    }
  }

  clear(){
    this.form.reset(DefaultUser);
    this.userID = null;
    this.submitted = false;
    this.selectedEmp = null;
  }

  get formControls(){
    return this.form.controls;
  }

  fetchUsers(){
    // console.log(this.form.value.Description?this:"no value")
   this.usersInfoService.getAllUsers(this.SearchForm.value);
  }

  editUserInfo(user: UserData){
    this.clear();
    this.form.patchValue({
      ...user,
      IDNumber: user.IDNO,
      Department: user.Department,
      ConfirmPassword: user.Password
    });

    this.userID = user.UserID;
  }

  deleteUser(user: UserData){
    this.usersInfoService.deleteUser(user).subscribe(
      (response:any) => {
        if(response!.status! > 0){
          this.fetchUsers();
        }
      }
    )
  }

}
