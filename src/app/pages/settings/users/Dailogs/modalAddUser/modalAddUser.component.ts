import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { UsersService } from '../../users.service';

@Component({
  selector: 'modal-add-user',
  templateUrl: 'modalAddUser.component.html',
})
export class AddUserComponent implements OnInit {
  @Output() afterSave: EventEmitter<any> = new EventEmitter();
  constructor(private usersService: UsersService, private toastr: ToastrService,) { }
  formAddUser = new FormGroup({
    userName: new FormControl(),
    email: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    phoneNumber: new FormControl(),
  })
  ngOnInit(): void {




  }
  AddUser(){
    this.usersService.addUser({...this.formAddUser.value,userId:0}).subscribe((res: any) => {
      if (res.rv > 0) {
        this.toastr.success(res.Msg);
        this.formAddUser.reset();
        this.afterSave.emit();
      } else {
        this.toastr.error(res.Msg);

      }
    }, (err => {
      this.toastr.error("خطا غير معروف");
    }))
  }
}
