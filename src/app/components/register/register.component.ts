import { MessageService } from 'primeng/api';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FsiRole } from 'src/app/model/enum';
import { AuthService } from 'src/app/services/auth.service';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  provinces: any[] = FsiValues.areas;
  jobs: any[] = FsiValues.jobs;
  universities: any[] = FsiValues.universities.map((x) => {
    return {
      value: x.universityName,
      name: x.universityName,
    };
  });
  handleSubmit: boolean = false;
  isShowPassword: boolean = false;
  isShowRePassword: boolean = false;
  acceptDieuKhoan: boolean = false;
  comparePassword: boolean = false;

  universitySpecializeds?: any[] = FsiValues.universities[0].specializeds?.map(
    (x) => {
      return {
        value: x,
        name: x,
      };
    }
  );

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() login: EventEmitter<any> = new EventEmitter();
  formRegister: FormGroup = this.fb.group({});
  roles: any[] = [
    { name: 'Nhà khởi nghiệp/ Founder/ Co-founder', value: FsiRole.Startuper },
    { name: 'Nhà đầu tư', value: FsiRole.Investor },
  ];
  genders: any[] = [
    { name: 'Nam', value: true },
    { name: 'Nữ', value: false },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.formRegister = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rePassword: [null, [Validators.required]],
      roleRegister: [FsiRole.Startuper, [Validators.required]],
      baseInfomation: this.fb.group({
        surname: [null, [Validators.required]],
        name: [null, [Validators.required]],
        dateOfBirth: [null, [Validators.required]],
        identityCard: [null, []],
        location: [null, [Validators.required]],
        workingPlace: [null, []],
        gender: [true, []],
        job: [null, [Validators.required]],
        university: [null, []],
        universitySpecialized: [null, []],
        studentId: [null, []],
      }),
    });
    this.formRegister.valueChanges.subscribe((values) => {

      if (values.baseInfomation.job == 1) {
        this.formRegister.get('university')?.setValidators([Validators.required]);
        this.formRegister.get('universitySpecialized')?.setValidators([Validators.required]);
        this.formRegister.get('studentId')?.setValidators([Validators.required]);
      }
      else {
        this.formRegister.get('university')?.clearValidators();
        this.formRegister.get('universitySpecialized')?.clearValidators();
        this.formRegister.get('studentId')?.clearValidators();
      }
    });
  }

  ngOnInit() {

  }

  get f() {
    return this.formRegister.controls;
  }

  get jobValue() {
    return this.formRegister.value['baseInfomation']['job'];
  }

  closeRegister() {
    this.close.emit();
  }

  routeToLogin() {
    this.login.emit();
    this.close.emit();
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

  accept() {
    this.acceptDieuKhoan = !this.acceptDieuKhoan;
  }

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  showRePassword() {
    this.isShowRePassword = !this.isShowRePassword;
  }

  handleChange() {
    if (
      this.formRegister.value.password != this.formRegister.value.rePassword
    ) {
      this.comparePassword = true;
    } else {
      this.comparePassword = false;
    }
  }

  submit() {
    // console.log(this.acceptDieuKhoan)
    // console.log('form', this.formRegister.value)
    this.handleSubmit = true;
    this.formRegister.get('university')?.updateValueAndValidity();
    this.formRegister.get('universitySpecialized')?.updateValueAndValidity();
    this.formRegister.get('studentId')?.updateValueAndValidity();

    if (this.formRegister.valid) {
      console.log(this.formRegister.value);
        if (
          this.formRegister.value.password != this.formRegister.value.rePassword
        ) {
          this.comparePassword = true;
        } else {
          let value = this.formRegister.value;
          value.baseInfomation.phone = value.phoneNumber;
          value.baseInfomation.name =
            value.baseInfomation.surname + ' ' + value.baseInfomation.name;
          this.authService
            .register(this.formRegister.value)
            .then((res: any) => {
              console.log(res);
              this.closeRegister();
              this.messageService.add({
                key: 'toast',
                severity: 'success',
                summary: 'Thành công',
                detail: 'Đăng ký thành công! Hãy đăng nhập để sử dụng dịch vụ!',
              });
            })
            .catch((err: any) => {
              console.log(err.response);
              this.messageService.add({
                key: 'toast',
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Đăng ký thất bại!',
              });
            });
        }
    }
  }
}
