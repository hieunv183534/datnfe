import { MessageService } from 'primeng/api';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FsiRole } from 'src/app/model/enum';
import { AuthService } from 'src/app/services/auth.service';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  provinces: any[] = FsiValues.areas;
  jobs: any[] = FsiValues.jobs;
  universities: any[] = FsiValues.universities.map(x => {
    return {
      value: x.universityName,
      name: x.universityName
    }
  });

  universitySpecializeds?: any[] = FsiValues.universities[0].specializeds?.map(x => {
    return {
      value: x,
      name: x
    }
  });


  @Output() close: EventEmitter<any> = new EventEmitter();
  formRegister: FormGroup = this.fb.group({});
  roles: any[] = [{ name: "Nhà khởi nghiệp/ Founder/ Co-founder", value: FsiRole.Startuper }, { name: "Nhà đầu tư", value: FsiRole.Investor }];
  genders: any[] = [{ name: "Nam", value: true }, { name: "Nữ", value: false }];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.formRegister = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rePassword: [null, [Validators.required]],
      roleRegister: [FsiRole.Startuper, [Validators.required]],
      baseInfomation: this.fb.group({
        name: [null, [Validators.required]],
        dateOfBirth: [null, [Validators.required]],
        identityCard: [null, []],
        location: [null, [Validators.required]],
        workingPlace: [null, []],
        gender: [true, []],
        job: [1, [Validators.required]],
        university: [FsiValues.universities[0].universityName, []],
        universitySpecialized: [null, []],
        studentId: [null, []]
      })
    })
    debugger
  }

  get f() { return this.formRegister.controls; }

  get jobValue() {
    return this.formRegister.value["job"];
  }

  closeRegister() {
    this.close.emit();
  }

  changeUniversity(e: any) {
    this.universitySpecializeds = FsiValues.universities.find(x => x.universityName == e.value)?.specializeds?.map(x => {
      return {
        value: x,
        name: x
      }
    });
  }

  submit() {
    if (this.formRegister.valid) {
      if (this.formRegister.value.password != this.formRegister.value.rePassword) {
        alert("Mật khẩu không trùng khớp!")
      } else {
        let value = this.formRegister.value;
        value.baseInfomation.phone = value.phoneNumber;
        this.authService.register(this.formRegister.value).then((res: any) => {
          console.log(res);
          this.closeRegister();
          this.messageService.add({
            key: "toast",
            severity: "success",
            summary: "Thành công",
            detail: "Đăng ký thành công! Hãy đăng nhập để sử dụng dịch vụ!",
          });
        }).catch((err: any) => {
          console.log(err.response);
          this.messageService.add({
            key: "toast",
            severity: "error",
            summary: "Lỗi",
            detail: "Đăng ký thất bại!",
          });
        });
      }
    }
  }

}
