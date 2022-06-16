import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { UsersService } from './users.service';



@Component({
  selector: 'users',
  templateUrl: 'users.component.html',
  styles: [`table {
    width: 100%;
  }`],

})
export class usersComponent implements OnInit {
  msgs: Message[] = [];
  position: string;
  display: boolean = false;
  displayModal: boolean;
  items: MenuItem[];
  displaymodal1: boolean = false;
  displaymodal2: boolean = false;
  displaymodal3: boolean = false;
  displaymodal4: boolean = false;
  displaymodal5: boolean = false;
  dataSource: any[] = [];
  userId: any;
  dataUser: any
  displayedColumns: string[] = ['#', "ID", 'Name', 'Roles', 'Actions'];
  formCheckRoles = new FormGroup({})
  constructor(private confirmationService: ConfirmationService, private usersService: UsersService, private cdr: ChangeDetectorRef, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getUsers();

    //   this.items = [
    //     {label: 'Update', icon: 'pi pi-refresh', command: () => {}},
    //     {label: 'Delete', icon: 'pi pi-times', command: () => {
    //         // this.delete();
    //     }},
    //     {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
    //     {separator: true},
    //     {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
    // ];
  }

  isRolesShow = true;
  showDialogAddUser() {
    this.display = true;

  }
  hidDialogAddUser() {
    this.display = false;
    this.getUsers();

  }
  showmodal1(dataUser: any) {
    this.displaymodal1 = true;
    this.dataUser = dataUser;

  }
  showmodal2(dataUser: any) {
    this.dataUser = dataUser;
    this.displaymodal2 = true;

  }
  showmodal3(dataUser: any) {
    this.displaymodal3 = true;
this.dataUser = dataUser;
  }
  showmodal4() {
    this.displaymodal4 = true;

  }
  showmodal5(id: any) {
    console.log("id", id)
    this.userId = id;
    this.displaymodal5 = true;

  }
  hidmodal5() {
    this.displaymodal5 = false;
    this.userId = null;
    this.getUsers();


  }
  hidmodal2() {
    this.displaymodal2 = false;

    this.getUsers();


  }
  hidmodal1() {
    this.displaymodal1 = false;
    this.getUsers();


  }
  hidmodal3() {
    this.displaymodal3 = false;
    this.getUsers();


  }
  toggleRoles() {
    this.isRolesShow = !this.isRolesShow;
  }

  getUsers() {
    this.usersService.getUsers().subscribe(Data => {
      this.dataSource = Data;
      Data.forEach((item: any) => {
        this.formCheckRoles.addControl(
          `item-${item.UserId}`,
          new FormControl(false)
        );
      });
      this.cdr.detectChanges()
    })
  }
  confirm(element: any) {

    this.confirmationService.confirm({
      message: 'التبديل لتفعيل تلقي إشعارات البريد الإلكتروني أم لا?',
      acceptLabel: ' ',
      rejectLabel: " ",
      accept: () => {
        console.log("element", element.IsEmailNotification)
        this.usersService.isEmailNotification
          ({
            isEmailNotification: !element.IsEmailNotification,
            userId: element.UserId
          })
          .subscribe((res: any) => {
            if (res.rv > 0) {
              this.toastr.success(res.Msg);
              this.getUsers();
            } else {
              this.toastr.error(res.Msg);

            }
          })
        //Actual logic to perform a confirmation
      }
    });
  }
  confirmChangeStatus(element: any) {

    this.confirmationService.confirm({
      message: 'التبديل إذا كان المستخدم نشطًا أم لا?',
      acceptLabel: ' ',
      rejectLabel: " ",
      accept: () => {


        //Actual logic to perform a confirmation
      }
    });
  }
  collaps(item?: any) {

    if (!this.formCheckRoles.get(`item-${item.UserId}`)?.value) {
      this.formCheckRoles.get(`item-${item.UserId}`)?.setValue(true);
    } else {
      this.formCheckRoles.get(`item-${item.UserId}`)?.setValue(false);

    }



  }
  deleteRoleLoc(UserID: any, LocationId: any, RoleId: any) {
    this.usersService.deleteRoleLoc(UserID, LocationId, RoleId).subscribe((res: any) => {
      if (res.rv > 0) {
        this.toastr.success(res.Msg);
        this.getUsers();
      } else {
        this.toastr.error(res.Msg);

      }
    })
  }
}
