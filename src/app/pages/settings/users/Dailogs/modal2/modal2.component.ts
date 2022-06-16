import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { UsersService } from '../../users.service';
@Component({
  selector: 'modal2',
  templateUrl: 'modal2.component.html',
})
export class modal2Component implements OnInit {
  DataPage: any;
  idRoles: any;
  idLocation: any;
  @Input("dataUser") dataUser: any;
  @Output() afterSave: EventEmitter<any> = new EventEmitter();


  constructor(private usersService: UsersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.usersService.getCodeUsers().subscribe(value => {
      this.DataPage = value;
      console.log("DataRoles", value)
    })


  }


  checkRoles(id: any) {
    this.idRoles = id
  }
  checkLocation(id: any) {
    this.idLocation = id;
  }
  saveRolesLocation() {
    if (this.idRoles && this.idLocation) {
      this.usersService.UsersLocationRoles({
        "userId": this.dataUser.UserId,
        "locationId": this.idLocation,
        "roleId": this.idRoles
      }).subscribe((res: any) => {
        if (res.rv > 0) {
          this.toastr.success(res.Msg);
          this.idLocation=null
          this.idRoles=null
          this.afterSave.emit();
        } else {
          this.toastr.error(res.Msg);

        }
      }, (err => {
        this.toastr.error("خطا غير معروف");
      }))
    }

  }
}
