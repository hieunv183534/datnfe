import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ImageCroppedEvent,
  ImageCropperComponent,
  LoadedImage,
} from 'ngx-image-cropper';
import { MessageService } from 'primeng/api';
import { CreateStartuperDto } from 'src/app/model/startuper.class';
import { StartuperService } from 'src/app/services/startuper.service';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-register-startuper-info',
  templateUrl: './register-startuper-info.component.html',
  styleUrls: ['./register-startuper-info.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class RegisterStartuperInfoComponent implements OnInit {
  fields: any = FsiValues.fields;
  personalities: any = FsiValues.personalities;
  skills: any = FsiValues.skills;
  yearOfExps: any = FsiValues.yearOfExps;
  availableTimes: any = FsiValues.availableTimes;
  specializies: any = FsiValues.specializies;
  genders: any[] = [
    { name: 'Nam', value: true },
    { name: 'Nữ', value: false },
  ];
  purposes: any[] = FsiValues.purposes;

  @Input() display: boolean = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();

  activeIndex: number = 0;
  formStartuper: FormGroup = this.fb.group({});
  handleSubmit: boolean = false;

  constructor(
    private startuperService: StartuperService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formStartuper = this.fb.group({
      describe: [null, [Validators.required]],
      purpose: [null, 0],
      ideaField: [null, [Validators.required]],
      targetField: [null, [Validators.required]],
      targetSpecialize: [null, [Validators.required]],
      requestPersonality: [null, [Validators.required]],
      requestSkill: [null, [Validators.required]],
      field: [null, []],
      speciality: [null, []],
      personality: [null, []],
      skill: [null, []],
      workingExperience: [null, []],
      activity: [null, []],
      certificateAndAward: [null, []],
      hasProject: [null, []],
      yearOfExp: [null, []],
      availableTime: [null, []],
      specialize: [null, [Validators.required]],
    });
    this.getDataEmpty();
  }

  getDataEmpty() {
    this.formStartuper.patchValue({
      describe: null,
      field: null,
      purpose: 0,
      ideaField: [],
      targetField: [],
      targetSpecialize: [],
      speciality: null,
      personality: [],
      requestPersonality: [],
      requestSkill: [],
      skill: [],
      workingExperience: null,
      activity: null,
      certificateAndAward: null,
      hasProject: null,
      yearOfExp: null,
      availableTime: null,
      specialize: [],
    });
  }

  handleChange() {
    if (this.formStartuper.value.purpose != 1) {
      this.formStartuper.controls['ideaField'].clearValidators();
      this.formStartuper.controls['ideaField'].updateValueAndValidity();
      this.formStartuper.controls['targetSpecialize'].clearValidators();
      this.formStartuper.controls['targetSpecialize'].updateValueAndValidity();
      this.formStartuper.controls['requestPersonality'].clearValidators();
      this.formStartuper.controls[
        'requestPersonality'
      ].updateValueAndValidity();
      this.formStartuper.controls['requestSkill'].clearValidators();
      this.formStartuper.controls['requestSkill'].updateValueAndValidity();
    } else if (
      this.formStartuper.value.purpose != 4 &&
      this.formStartuper.value.purpose != 2
    ) {
      this.formStartuper.controls['targetField'].clearValidators();
      this.formStartuper.controls['targetField'].updateValueAndValidity();
    }
    if (this.formStartuper.value.purpose == 1) {
      this.formStartuper.controls['ideaField'].setValidators([
        Validators.required,
      ]);
      this.formStartuper.controls['ideaField'].updateValueAndValidity();
      this.formStartuper.controls['targetSpecialize'].setValidators([
        Validators.required,
      ]);
      this.formStartuper.controls['targetSpecialize'].updateValueAndValidity();
      this.formStartuper.controls['requestPersonality'].setValidators([
        Validators.required,
      ]);
      this.formStartuper.controls[
        'requestPersonality'
      ].updateValueAndValidity();
      this.formStartuper.controls['requestSkill'].setValidators([
        Validators.required,
      ]);
      this.formStartuper.controls['requestSkill'].updateValueAndValidity();
    } else if (
      this.formStartuper.value.purpose == 4 ||
      this.formStartuper.value.purpose == 2
    ) {
      this.formStartuper.controls['targetField'].setValidators([
        Validators.required,
      ]);
      this.formStartuper.controls['targetField'].updateValueAndValidity();
    }
  }

  hide() {
    this.close.emit();
  }

  save() {
    this.submit.emit();
  }

  back() {
    if (this.activeIndex > 0) this.activeIndex--;
  }

  submitAvt(){
    
  }

  next() {
    if (this.activeIndex == 0) {
      if (this.blob) {
        this.uploadImage();
        this.activeIndex++;
      } else {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Cảnh báo',
          detail: 'Bạn chưa hoàn thành cập nhật ảnh đại diện cá nhân!',
        });
      }
    } else if (this.activeIndex == 1) {
      this.handleSubmit = true;
      console.log(this.formStartuper.value);
      if (this.formStartuper.valid && this.formStartuper.value.purpose != 0) {
        let input = new CreateStartuperDto();
        input.activity = this.formStartuper.value.activity;
        input.availableTime = this.formStartuper.value.availableTime;
        input.certificateAndAward =
          this.formStartuper.value.certificateAndAward;
        input.describe = this.formStartuper.value.describe;
        input.field = this.formStartuper.value.field;
        input.personality = this.formStartuper.value.personality;
        input.skill = this.formStartuper.value.skill;
        input.speciality = this.formStartuper.value.speciality;
        input.workingExperience = this.formStartuper.value.workingExperience;
        input.yearOfExp = this.formStartuper.value.yearOfExp;
        input.purpose = this.formStartuper.value.purpose;
        input.specialize = this.formStartuper.value.specialize;
        this.startuperService
          .insertStartuperAsync(input)
          .then((res: any) => {
            this.messageService.add({
              key: 'toast',
              severity: 'success',
              summary: 'Thành công',
              detail: 'Cập nhật thông tin thành công!',
            });
            this.activeIndex++;
          })
          .catch((err: any) => {
            this.messageService.add({
              key: 'toast',
              severity: 'error',
              summary: 'Lỗi',
              detail: 'Cập nhật thông tin thất bại!',
            });
          });
      } else {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Cảnh báo',
          detail: 'Vui lòng nhập đủ thông tin cần thiết!',
        });
      }
    } else this.close.emit();
  }

  @ViewChild(ImageCropperComponent) imageCropper?: ImageCropperComponent;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  blob: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log(event);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.blob = event.blob;
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl ?? ''
    );
    console.log(event);
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
