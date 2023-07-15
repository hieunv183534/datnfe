import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { StartuperService } from 'src/app/services/startuper.service';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.css']
})
export class UpdateUserInfoComponent implements OnInit {


  @Input() display: boolean = false;
  @Input() userInfo: any = {};
  @Output() close: EventEmitter<any> = new EventEmitter();
  areas: any[] = FsiValues.areas;
  fields: any = FsiValues.fields;
  jobs: any = FsiValues.jobs;
  personalities: any = FsiValues.personalities;
  skills: any = FsiValues.skills;
  yearOfExps: any = FsiValues.yearOfExps;
  availableTimes: any = FsiValues.availableTimes;
  genders: any[] = [{ name: "Nam", value: true }, { name: "Nữ", value: false }];

  formBaseInfo: FormGroup = this.fb.group({});
  formStartuperInfo: FormGroup = this.fb.group({});
  formChangePassword: FormGroup = this.fb.group({});
  activeIndex: number = 0;
  steps: MenuItem[] = [];
  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private startuperService: StartuperService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.croppedImage = this.userInfo.avatarUrl;
    this.steps = [
      { label: 'Ảnh đại diện' },
      { label: 'Thông tin cơ bản' },
      { label: 'Thông tin chuyên biệt' },
      { label: 'Mật khẩu' }
    ];

    this.formBaseInfo = this.fb.group({
      email: [null, []],
      phoneNumber: [null, []],
      name: [null, []],
      dateOfBirth: [null, []],
      identityCard: [null, []],
      location: [null, []],
      workingPlace: [null, []],
      gender: [null, []],
      job: [null, []]
    });

    this.formStartuperInfo = this.fb.group({
      describe: [null, []],
      field: [null, []],
      speciality: [null, []],
      personality: [null, []],
      skill: [null, []],
      workingExperience: [null, []],
      activity: [null, []],
      certificateAndAward: [null, []],
      hasProject: [null, []],
      yearOfExp: [null, []],
      availableTime: [null, []]
    });

    this.formChangePassword = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      reNewPassword: [null, [Validators.required]],
    });

    this.getUserInfo();
  }

  getUserInfo() {
    this.startuperService.getMyInfo().then((res: any) => {
      console.log(res.data);

      this.formBaseInfo.patchValue({
        email: res.data.extraProperties.email,
        phoneNumber: res.data.extraProperties.phoneNumber,
        name: res.data.name,
        dateOfBirth: new Date(res.data.dateOfBirth),
        identityCard: res.data.identityCard,
        location: res.data.location,
        workingPlace: res.data.workingPlace,
        gender: res.data.gender,
        job: res.data.job
      });

      this.formStartuperInfo.patchValue({
        describe: res.data.describe,
        field: res.data.field,
        speciality: res.data.speciality,
        personality: res.data.personality,
        skill: res.data.skill,
        workingExperience: res.data.workingExperience,
        activity: res.data.activity,
        certificateAndAward: res.data.certificateAndAward,
        hasProject: res.data.hasProject,
        yearOfExp: res.data.yearOfExp,
        availableTime: res.data.availableTime
      });
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy thông tin thất bại!",
      });
    });
  }

  save() {
    if (this.activeIndex == 0) {
      if (this.blob) {
        this.uploadImage();
      }
    } else if (this.activeIndex == 1) {
      console.log(this.formBaseInfo.value);
      this.startuperService.updateBaseInfo(this.formBaseInfo.value).then((res: any) => {
        this.messageService.add({
          key: "toast",
          severity: "success",
          summary: "Thành công",
          detail: "Cập nhật thông tin thành công!",
        });
      }).catch((err: any) => {
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Lỗi",
          detail: "Cập nhật thất bại!",
        });
      });
    } else if (this.activeIndex == 2) {
      this.startuperService.insertStartuperAsync(this.formStartuperInfo.value).then((res: any) => {
        this.messageService.add({
          key: "toast",
          severity: "success",
          summary: "Thành công",
          detail: "Cập nhật thông tin thành công!",
        });
      }).catch((err: any) => {
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Lỗi",
          detail: "Cập nhật thất bại!",
        });
      });
    } else if (this.activeIndex == 3) {
      if (this.formChangePassword.valid) {
        if (this.formChangePassword.value.newPassword == this.formChangePassword.value.reNewPassword) {
          this.authService.changePassword(this.formChangePassword.value.oldPassword, this.formChangePassword.value.newPassword).then((res: any) => {
            if(res.data){
              this.messageService.add({
                key: "toast",
                severity: "success",
                summary: "Thành công",
                detail: "Thay đổi mật khẩu thành công, vui lòng đăng nhập lại!",
              });
              localStorage.clear();
              this.router.navigate(['./']);

            }else{
              this.messageService.add({
                key: "toast",
                severity: "error",
                summary: "Lỗi",
                detail: "Mật khẩu hiện tại bạn nhập không đúng!",
              });
            }
          }).catch((err: any) => {
            this.messageService.add({
              key: "toast",
              severity: "error",
              summary: "Lỗi",
              detail: "Thay đổi mật khẩu thất bại, vui lòng thử lại sau!",
            });
          });
        } else {
          this.messageService.add({
            key: "toast",
            severity: "error",
            summary: "Lỗi",
            detail: "Mật khẩu nhập lại chưa trùng khớp!",
          });
        }
      } else {
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Lỗi",
          detail: "Vui lòng nhập đủ thông tin!",
        });
      }
    }
  }



  @ViewChild(ImageCropperComponent) imageCropper?: ImageCropperComponent;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  blob: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.blob = event.blob;
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl ?? "");
  }

  imageLoaded(image: LoadedImage) {
    console.log("imageLoaded");
  }
  cropperReady() {
    console.log("cropperReady");
  }
  loadImageFailed() {
    console.log("loadImageFailed");
  }

  uploadImage() {
    let file = new File([this.blob], '1.png');
    this.startuperService.uploadAvatar(file).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Tải lên ảnh đại diện cá nhân thành công!",
      });
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Tải lên ảnh đại diện cá nhân thất bại!",
      });
    });
  }
}
