import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ImageCropperComponent,
  ImageCroppedEvent,
  LoadedImage,
} from 'ngx-image-cropper';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { StartuperService } from 'src/app/services/startuper.service';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class UpdateUserInfoComponent implements OnInit {
  @Input() display: boolean = false;
  @Input() userInfo: any = {};
  @Output() close: EventEmitter<any> = new EventEmitter();
  areas: any[] = FsiValues.areas;
  fields: any = FsiValues.fields;
  jobs: any = FsiValues.jobs;
  personalities: any = FsiValues.personalities;
  specializies: any = FsiValues.specializies;
  skills: any = FsiValues.skills;
  yearOfExps: any = FsiValues.yearOfExps;
  availableTimes: any = FsiValues.availableTimes;
  genders: any[] = [
    { name: 'Nam', value: true },
    { name: 'Nữ', value: false },
  ];
  purposes: any[] = FsiValues.purposes;
  innerWidth: any;

  universities: any[] = FsiValues.universities.map((x) => {
    return {
      value: x.universityName,
      name: x.universityName,
    };
  });

  universitySpecializeds?: any[] = [];

  formBaseInfo: FormGroup = this.fb.group({});
  formStartuperInfo: FormGroup = this.fb.group({});
  formChangePassword: FormGroup = this.fb.group({});
  activeIndex: number = 0;
  steps: MenuItem[] = [];
  handleSubmit: boolean = false;
  isLoading: boolean = false;

  avatars = [
    "https://daustore.store/fsi/avatar1.png",
    "https://daustore.store/fsi/avatar2.png",
    "https://daustore.store/fsi/avatar3.png",
    "https://daustore.store/fsi/avatar4.png",
    "https://daustore.store/fsi/avatar5.png",
    "https://daustore.store/fsi/avatar6.png",
    "https://daustore.store/fsi/avatar7.png",
    "https://daustore.store/fsi/avatar8.png"
  ];

  avtIndex: number = -1;

  avatarUrl: string = "";

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private startuperService: StartuperService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.formBaseInfo = this.fb.group({
      email: [null, [Validators.required]],
      phoneNumber: [null, []],
      name: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      identityCard: [null, []],
      location: [null, []],
      workingPlace: [null, []],
      gender: [null, []],
      job: [null, [Validators.required]],
      university: [FsiValues.universities[0].universityName, []],
      universitySpecialized: [null, []],
      studentId: [null, []],
    });

    this.formStartuperInfo = this.fb.group({
      describe: [null, []],
      purpose: [null, [Validators.required]],
      ideaField:[null, []],
      targetField: [null, []],
      targetSpecialize: [null, []],
      requestPersonality: [null, []],
      requestSkill: [null, []],
      field: [null, [Validators.required]],
      speciality: [null, []],
      personality: [null, [Validators.required]],
      skill: [null, [Validators.required]],
      workingExperience: [null, []],
      activity: [null, []],
      certificateAndAward: [null, []],
      hasProject: [null, []],
      yearOfExp: [null, [Validators.required]],
      availableTime: [null, [Validators.required]],
      specialize: [null, [Validators.required]],
    });

    this.formBaseInfo.valueChanges.subscribe((values) => {
      // console.log('Form values changed:', changes.job);
      if (values.job == 1) {
        this.formBaseInfo.get('university')?.setValidators([Validators.required]);
        this.formBaseInfo.get('universitySpecialized')?.setValidators([Validators.required]);
        this.formBaseInfo.get('studentId')?.setValidators([Validators.required]);
      }
      else {
        this.formBaseInfo.get('university')?.clearValidators();
        this.formBaseInfo.get('universitySpecialized')?.clearValidators();
        this.formBaseInfo.get('studentId')?.clearValidators();

      }
    });
    this.formStartuperInfo.valueChanges.subscribe((values) => {

      if (values.purpose == 1) {
        this.formStartuperInfo.get('ideaField')?.setValidators([Validators.required]);
        this.formStartuperInfo.get('targetSpecialize')?.setValidators([Validators.required]);
        this.formStartuperInfo.get('requestPersonality')?.setValidators([Validators.required]);
        this.formStartuperInfo.get('requestSkill')?.setValidators([Validators.required]);

        this.formBaseInfo.get('targetField')?.clearValidators();
      }
      else if (values.purpose == 2) {
        this.formStartuperInfo.get('targetField')?.setValidators([Validators.required]);
        this.formBaseInfo.get('targetSpecialize')?.clearValidators();
        this.formBaseInfo.get('requestPersonality')?.clearValidators();
        this.formBaseInfo.get('requestSkill')?.clearValidators();
        this.formBaseInfo.get('ideaField')?.clearValidators();
      }
      else if (values.purpose == 4) {
        this.formStartuperInfo.get('targetField')?.setValidators([Validators.required]);

        this.formBaseInfo.get('targetSpecialize')?.clearValidators();
        this.formBaseInfo.get('requestPersonality')?.clearValidators();
        this.formBaseInfo.get('requestSkill')?.clearValidators();
        this.formBaseInfo.get('ideaField')?.clearValidators();
      }
      else {
        this.formBaseInfo.get('targetField')?.clearValidators();
        this.formBaseInfo.get('targetSpecialize')?.clearValidators();
        this.formBaseInfo.get('requestPersonality')?.clearValidators();
        this.formBaseInfo.get('requestSkill')?.clearValidators();
        this.formBaseInfo.get('ideaField')?.clearValidators();
      }

    })
  }

  ngOnInit() {

    this.steps = [
      { label: 'Ảnh đại diện' },
      { label: 'Thông tin cơ bản' },
      { label: 'Thông tin chuyên biệt' },
      { label: 'Mật khẩu' },
    ];




    this.formChangePassword = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      reNewPassword: [null, [Validators.required]],
    });

    this.getUserInfo();
  }

  get jobValue() {
    return this.formBaseInfo.value['job'];
  }
  // handleChange() {
  //   if (this.formStartuperInfo.value.purpose != 1) {
  //     this.formStartuperInfo.controls['ideaField'].clearValidators();
  //     this.formStartuperInfo.controls['ideaField'].updateValueAndValidity();
  //     this.formStartuperInfo.controls['targetSpecialize'].clearValidators();
  //     this.formStartuperInfo.controls[
  //       'targetSpecialize'
  //     ].updateValueAndValidity();
  //     this.formStartuperInfo.controls['requestPersonality'].clearValidators();
  //     this.formStartuperInfo.controls[
  //       'requestPersonality'
  //     ].updateValueAndValidity();
  //     this.formStartuperInfo.controls['requestSkill'].clearValidators();
  //     this.formStartuperInfo.controls['requestSkill'].updateValueAndValidity();
  //   } else if (
  //     this.formStartuperInfo.value.purpose != 4 &&
  //     this.formStartuperInfo.value.purpose != 2
  //   ) {
  //     this.formStartuperInfo.controls['targetField'].clearValidators();
  //     this.formStartuperInfo.controls['targetField'].updateValueAndValidity();
  //   }
  //   if (this.formStartuperInfo.value.purpose == 1) {
  //     this.formStartuperInfo.controls['ideaField'].setValidators([
  //       Validators.required,
  //     ]);
  //     this.formStartuperInfo.controls['ideaField'].updateValueAndValidity();
  //     this.formStartuperInfo.controls['targetSpecialize'].setValidators([
  //       Validators.required,
  //     ]);
  //     this.formStartuperInfo.controls[
  //       'targetSpecialize'
  //     ].updateValueAndValidity();
  //     this.formStartuperInfo.controls['requestPersonality'].setValidators([
  //       Validators.required,
  //     ]);
  //     this.formStartuperInfo.controls[
  //       'requestPersonality'
  //     ].updateValueAndValidity();
  //     this.formStartuperInfo.controls['requestSkill'].setValidators([
  //       Validators.required,
  //     ]);
  //     this.formStartuperInfo.controls['requestSkill'].updateValueAndValidity();
  //   } else if (
  //     this.formStartuperInfo.value.purpose == 4 ||
  //     this.formStartuperInfo.value.purpose == 2
  //   ) {
  //     this.formStartuperInfo.controls['targetField'].setValidators([
  //       Validators.required,
  //     ]);
  //     this.formStartuperInfo.controls['targetField'].updateValueAndValidity();
  //   }
  // }

  getUserInfo() {
    this.startuperService
      .getMyInfo()
      .then((res: any) => {
        this.avatarUrl = res.data.avatarUrl;
        this.formBaseInfo.patchValue({
          email: res.data.extraProperties.email,
          phoneNumber: res.data.extraProperties.phoneNumber,
          name: res.data.name,
          dateOfBirth: new Date(res.data.dateOfBirth),
          identityCard: res.data.identityCard,
          location: res.data.location,
          workingPlace: res.data.workingPlace,
          gender: res.data.gender,
          job: res.data.job,
          university: res.data.university,
          universitySpecialized: res.data.universitySpecialized,
          studentId: res.data.studentId,
        });

        if (res.data.university) {
          this.universitySpecializeds = FsiValues.universities
            .find((x) => x.universityName == res.data.university)
            ?.specializeds?.map((x) => {
              return {
                value: x,
                name: x,
              };
            });
        }

        this.formStartuperInfo.patchValue({
          describe: res.data.describe,
          field: res.data.field,
          purpose: res.data.purpose,
          ideaField: res.data.ideaField,
          targetField: res.data.targetField,
          targetSpecialize: res.data.targetSpecialize,
          speciality: res.data.speciality,
          personality: res.data.personality,
          requestPersonality: res.data.requestPersonality,
          requestSkill: res.data.requestSkill,
          skill: res.data.skill,
          workingExperience: res.data.workingExperience,
          activity: res.data.activity,
          certificateAndAward: res.data.certificateAndAward,
          hasProject: res.data.hasProject,
          yearOfExp: res.data.yearOfExp,
          availableTime: res.data.availableTime,
          specialize: res.data.specialize,
        });

        // if (this.formStartuperInfo.value.purpose != 1) {
        //   this.formStartuperInfo.controls['ideaField'].clearValidators();
        //   this.formStartuperInfo.controls['ideaField'].updateValueAndValidity();
        //   this.formStartuperInfo.controls['targetSpecialize'].clearValidators();
        //   this.formStartuperInfo.controls[
        //     'targetSpecialize'
        //   ].updateValueAndValidity();
        //   this.formStartuperInfo.controls[
        //     'requestPersonality'
        //   ].clearValidators();
        //   this.formStartuperInfo.controls[
        //     'requestPersonality'
        //   ].updateValueAndValidity();
        //   this.formStartuperInfo.controls['requestSkill'].clearValidators();
        //   this.formStartuperInfo.controls[
        //     'requestSkill'
        //   ].updateValueAndValidity();
        // } else if (
        //   this.formStartuperInfo.value.purpose != 4 &&
        //   this.formStartuperInfo.value.purpose != 2
        // ) {
        //   this.formStartuperInfo.controls['targetField'].clearValidators();
        //   this.formStartuperInfo.controls[
        //     'targetField'
        //   ].updateValueAndValidity();
        // }
      })
      .catch((err: any) => {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Lấy thông tin thất bại!',
        });
      });
  }

  submitAvt() {

  }

  changeUniversity(e: any) {
    this.universitySpecializeds = FsiValues.universities
      .find((x) => x.universityName == e.value)
      ?.specializeds?.map((x) => {
        return {
          value: x,
          name: x,
        };
      });
  }

  save() {
    this.handleSubmit = true;
    if (this.activeIndex == 0) {
      if (this.blob) {
        this.uploadImage();
      } else if (this.avtIndex != -1) {
        this.startuperService.chooseDefaultAvatar(this.avatars[this.avtIndex]).then((res: any) => {
          this.avatarUrl = res.data;
          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: 'Thành công',
            detail: 'Tải lên ảnh đại diện cá nhân thành công!',
          });
        }).catch((err: any) => {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'Lỗi',
            detail: 'Tải lên ảnh đại diện cá nhân thất bại!',
          });
        }).finally(() => this.isLoading = false);
      }
    } else if (this.activeIndex == 1) {
      this.formBaseInfo.get('university')?.updateValueAndValidity();
      this.formBaseInfo.get('universitySpecialized')?.updateValueAndValidity();
      this.formBaseInfo.get('studentId')?.updateValueAndValidity();
      if (this.formBaseInfo.valid) {
        this.isLoading = true;
        this.startuperService
          .updateBaseInfo(this.formBaseInfo.value)
          .then((res: any) => {
            this.messageService.add({
              key: 'toast',
              severity: 'success',
              summary: 'Thành công',
              detail: 'Cập nhật thông tin thành công!',
            });
          })
          .catch((err: any) => {
            this.messageService.add({
              key: 'toast',
              severity: 'error',
              summary: 'Lỗi',
              detail: 'Cập nhật thất bại!',
            });
          }).finally(() => this.isLoading = false);
      }
    } else if (this.activeIndex == 2) {
      debugger
      console.log(this.formStartuperInfo.valid);
      console.log(this.formStartuperInfo.value);
      
      this.formBaseInfo.get('targetField')?.updateValueAndValidity();
      this.formBaseInfo.get('ideaField')?.updateValueAndValidity();
      this.formBaseInfo.get('targetSpecialize')?.updateValueAndValidity();
      this.formBaseInfo.get('requestPersonality')?.updateValueAndValidity();
      this.formBaseInfo.get('requestSkill')?.updateValueAndValidity();
      if (this.formStartuperInfo.valid) {
        debugger
        
        this.isLoading = true;
        this.startuperService
          .insertStartuperAsync(this.formStartuperInfo.value)
          .then((res: any) => {
            this.messageService.add({
              key: 'toast',
              severity: 'success',
              summary: 'Thành công',
              detail: 'Cập nhật thông tin thành công!',
            });
          })
          .catch((err: any) => {
            this.messageService.add({
              key: 'toast',
              severity: 'error',
              summary: 'Lỗi',
              detail: 'Cập nhật thất bại!',
            });
          }).finally(() => this.isLoading = false);
      }
    } else if (this.activeIndex == 3) {
      if (this.formChangePassword.valid) {
        if (
          this.formChangePassword.value.newPassword ==
          this.formChangePassword.value.reNewPassword
        ) {
          this.isLoading = true;
          this.authService
            .changePassword(
              this.formChangePassword.value.oldPassword,
              this.formChangePassword.value.newPassword
            )
            .then((res: any) => {
              if (res.data) {
                this.messageService.add({
                  key: 'toast',
                  severity: 'success',
                  summary: 'Thành công',
                  detail:
                    'Thay đổi mật khẩu thành công, vui lòng đăng nhập lại!',
                });
                localStorage.clear();
                this.router.navigate(['./']);
              } else {
                this.messageService.add({
                  key: 'toast',
                  severity: 'error',
                  summary: 'Lỗi',
                  detail: 'Mật khẩu hiện tại bạn nhập không đúng!',
                });
              }
            })
            .catch((err: any) => {
              this.messageService.add({
                key: 'toast',
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Thay đổi mật khẩu thất bại, vui lòng thử lại sau!',
              });
            }).finally(() => this.isLoading = false);
        } else {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'Lỗi',
            detail: 'Mật khẩu nhập lại chưa trùng khớp!',
          });
        }
      } else {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Vui lòng nhập đủ thông tin!',
        });
      }
    }
  }

  @ViewChild('inputAvt') inputAvt: any;

  chooseAvt(i: number) {
    this.avtIndex = i;
    this.croppedImage = '';
    this.blob = '';
    this.imageChangedEvent = '';
    this.inputAvt.nativeElement.value = "";
  }

  @ViewChild(ImageCropperComponent) imageCropper?: ImageCropperComponent;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  blob: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.avtIndex = -1;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.blob = event.blob;
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl ?? ''
    );
  }

  imageLoaded(image: LoadedImage) {
    console.log('imageLoaded');
  }
  cropperReady() {
    console.log('cropperReady');
  }
  loadImageFailed() {
    console.log('loadImageFailed');
  }

  uploadImage() {
    let file = new File([this.blob], '1.png');
    this.startuperService
      .uploadAvatar(file)
      .then((res: any) => {
        this.avatarUrl = res.data;
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'Thành công',
          detail: 'Tải lên ảnh đại diện cá nhân thành công!',
        });
      })
      .catch((err: any) => {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Tải lên ảnh đại diện cá nhân thất bại!',
        });
      });
  }
}
