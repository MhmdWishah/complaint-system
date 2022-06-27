import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UsersService } from '../../users.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'modal5',
  templateUrl: 'modal5.component.html',
})
export class modal5Component implements OnInit, OnChanges {
  @Output() afterSave: EventEmitter<any> = new EventEmitter();
  @Input("idUser") idUser: any;

  imgProfile: string;
  fileToReturn: File;
  imgCanvas: string
  imageChangedEvent: any = "";
  croppedImage: any = "";
  display: boolean = false;
  actionChange: boolean = false;
  loading: boolean = false;
  constructor(private usersService: UsersService, private toastr: ToastrService,) { }
  formAddUser = new FormGroup({
    UserName: new FormControl(),
    Email: new FormControl(),
    FirstName: new FormControl(),
    LastName: new FormControl(),
    PhoneNumber: new FormControl(),
  })

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.idUser) {
      this.loading = true;
      this.usersService.getUserById(this.idUser).subscribe(value => {
        this.formAddUser.patchValue({ ...value[0] });
        this.loading = false;
        this.imgProfile = "http://cmms-api.accessline.ps/resources/Files/" + value[0].AvatarPath
      })
    }


  }
  EditUser() {
    // console.log("edit")
    this.usersService.addUser({ ...this.formAddUser.value, userId: this.idUser }).subscribe((res: any) => {
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

  showEditImage() {
    this.display = true;

  }



  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;

    this.fileToReturn = this.base64ToFile(
      event.base64,
      this.imageChangedEvent.target.files[0].name,
    )

    // console.log(this.imageChangedEvent.target.files[0]);
    // console.log(this.fileToReturn);
    return this.fileToReturn;
  }


  base64ToFile(data: any, filename: any) {
    // console.log("data", data);
    // console.log("filename", filename);
    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  imageLoaded() {
    /* show cropper */
  }
  cropperReady() {
    /* cropper ready */
  }
  loadImageFailed() {
    /* show message */
  }




  saveImg() {

    this.usersService.saveImageProfile(this.fileToReturn, this.idUser).subscribe(
      (res: any) => {
        if (res?.rv > 0) {
          this.toastr.success(res.Msg);
          this.display = false;
          this.loading = true
          this.usersService.getUserById(this.idUser).subscribe(value => {
            this.formAddUser.patchValue({ ...value[0] });
            this.imgProfile = "http://cmms-api.accessline.ps/resources/Files/" + value[0].AvatarPath
            this.loading = false

          })
        } else {
          this.toastr.error(res.Msg);
        }


      },
      (err) => {
        this.toastr.error(err.message);

      }
    );


  }
}
