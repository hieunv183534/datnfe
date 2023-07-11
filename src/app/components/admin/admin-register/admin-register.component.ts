import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  formRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private messageService: MessageService) {
    this.formRegister = this.fb.group({
      phone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rePassword: [null, [Validators.required]],
      name: [null, [Validators.required]],
    });
  }

  ngOnInit() {
  }

  get f() { return this.formRegister.controls; }

  register() {

    (<any>Object).values(this.formRegister.controls).forEach((control: any): any => {
      control.markAsDirty();
    });

    if (this.formRegister.valid) {
      if (this.formRegister.value.password == this.formRegister.value.rePassword) {
        this.adminService.register(this.formRegister.value).then((res: any): any => {
          this.messageService.add({ key: "toast", severity: 'success', summary: "SUCCESS", detail: "Đăng ký tài khoản thành công, chờ duyệt để đc sử dụng!" });
        }).catch((err: any): any => {
          this.messageService.add({ key: "toast", severity: 'error', summary: "FAILED", detail: "Đăng ký tài khoản thất bại !" });
        });
      } else {
        this.messageService.add({ key: "toast", severity: 'error', summary: "FAILED", detail: "Mật khẩu nhập lại không trùng khớp!" });
      }
    }
  }

}
