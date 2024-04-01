import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FsiRole } from 'src/app/model/enum';
import { AuthService } from 'src/app/services/auth.service';
import { StartuperService } from 'src/app/services/startuper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class LoginComponent implements OnInit {
  isShowPassword: boolean = false
  isLoading: boolean = false
  savePassword: boolean = false
  @Output() closeModalLogin: EventEmitter<any> = new EventEmitter();
  @Output() register: EventEmitter<any> = new EventEmitter();
  roles: any[] = [{ name: "Nhà khởi nghiệp/ Founder/ Co-founder", value: FsiRole.Startuper }, { name: "Nhà đầu tư", value: FsiRole.Investor }];
  formLogin: FormGroup = this.fb.group({});

  constructor(
    private startuperService: StartuperService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.formLogin = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      role: [0, [Validators.required]]
    })
  }

  ngOnInit() {
  }

  closeLogin() {
    this.closeModalLogin.emit();
  }

  showPassword() {
    this.isShowPassword = !this.isShowPassword
  }

  routeToRegister() {
    this.register.emit()
    this.closeModalLogin.emit()
  }

  submit() {
    if (this.formLogin.valid) {
      this.isLoading = true;
      this.authService.login(this.formLogin.value.username, this.formLogin.value.password, this.formLogin.value.role)
        .then(async (res: any) => {
          await this.startuperService.getCheckIsNewProfile().then((res: any) => {
            localStorage.setItem("IS_NEW_PROFILE", res.data);
          }).catch((err: any) => {
            localStorage.setItem("IS_NEW_PROFILE", 'false');

          });
          this.messageService.add({
            key: "toast",
            severity: "success",
            summary: "Thành công",
            detail: "Đăng nhập thành công, chuyển tới khu vực cá nhân!",
          });
          localStorage.setItem("TOKEN", res.data);
          if (this.formLogin.value.role == FsiRole.Startuper) {
            this.router.navigate(['../startuper'], { relativeTo: this.route });
          } else {
            this.router.navigate(['../investor'], { relativeTo: this.route });
          }
        }).catch((err: any) => {
          this.messageService.add({
            key: "toast",
            severity: "error",
            summary: "Lỗi",
            detail: "Đăng nhập thất bại!",
          });
        }).finally(() => this.isLoading = false);
    }
  }
}
