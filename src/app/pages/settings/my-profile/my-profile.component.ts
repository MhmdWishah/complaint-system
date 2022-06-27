import { ToastrService } from 'ngx-toastr';
import { NgModule, Component, ElementRef, VERSION, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import SignaturePad from "signature_pad";
import { MyProfileService } from './my-profille.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FilePond, FilePondOptions} from 'filepond';




@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  private ctx: CanvasRenderingContext2D;

  constructor(private service: MyProfileService, private toastr: ToastrService, private cdr: ChangeDetectorRef

  ) { }
  name = "Angular " + VERSION.major;

  imgProfile: string;
  fileToReturn: File;
  imgCanvas:string
  imageChangedEvent: any = "";
  croppedImage: any = "";
  display: boolean = false;
  actionChange:boolean=false;
  @ViewChild("canvas", { static: true }) canvas: ElementRef;
  sig: SignaturePad;
  formProfile = new FormGroup({
    UserName: new FormControl(),
    Email: new FormControl(),
    FirstName: new FormControl(),
    LastName: new FormControl(),
    PhoneNumber: new FormControl(),
    TwoFactorEnabled: new FormControl(),
    LanguageCode: new FormControl(),
    RefreshDuration: new FormControl(),
    IsEmailNotification: new FormControl(),
  })
  ngOnInit() {
    // this.sig = new SignaturePad(this.canvas.nativeElement);
    this.getDataProfile();
  }

  clearCanvas() {
    this.sig.clear();
    this.imgCanvas='';
  }

getDataProfile(){
  this.service.getDataProfile().subscribe(value => {
    this.formProfile.patchValue({ ...value })
    this.imgProfile="http://cmms-api.accessline.ps/resources/Files/"+value.AvatarPath;
    this.imgCanvas="http://cmms-api.accessline.ps/resources/Files/"+value.SignaturePath;
  })
}

  onEditProfile() {
    // console.log("this.actionChange",this.actionChange)
    if(this.actionChange==true){
    this.service.saveEdit(this.formProfile.value).subscribe((res: any) => {
      if (res.rv > 0) {
        this.toastr.success(res.Msg);
      } else {
        this.toastr.error(res.Msg);

      }
    }, (err => {
      this.toastr.error("خطا غير معروف");
    }))

  }
  this.actionChange=false;
  }


  ActionChange(){
    this.actionChange=true;
  }
  saveCanvas() {
    var image = new Image();
      image.src = this.sig.toDataURL();
      var SigFile= this.base64ToFile(
        image.src,
        "png",
      )

    this.service.EditCanvas(SigFile).subscribe((res: any) => {
      if (res.rv > 0) {
        this.toastr.success(res.Msg);
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


  base64ToFile(data:any, filename:any) {
    console.log("data", data);
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

         this.service.saveImageProfile(this.fileToReturn).subscribe(
      (res: any) => {
        if (res?.rv > 0) {
          this.toastr.success(res.Msg);
          this.display=false;
          this.getDataProfile();
         } else {
          this.toastr.error(res.Msg);
        }


      },
      (err) => {
        this.toastr.error(err.message);

      }
    );


  }
  @ViewChild('myPond')
  myPond!: FilePond;

  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: 'Drop files here...',
    acceptedFileTypes: ['image/jpeg, image/png'],
    allowReorder:true,
    maxFiles:5,
  }


  pondFiles: FilePondOptions["files"] = [
    {
      source: 'assets/photo.jpeg',
      options: {
        type: 'local'
      }
    }
  ]

  pondHandleInit() {
    // console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    // console.log('A file was added', event);
  }

  pondHandleRemoveFile(event: any) {
    // console.log('A file was removed', event);
  }

  pondHandleActivateFile(event: any) {
    // console.log('A file was activated', event)
  }

  uploadFiles(){
    // console.log(this.myPond.getFiles());
  }




}

