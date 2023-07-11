import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private adminService: AdminService,
    private messageService: MessageService) {
    this.formLogin = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  get f() { return this.formLogin.controls; }

  login() {

    (<any>Object).values(this.formLogin.controls).forEach((control: any): any => {
      control.markAsDirty();
    });

    if (this.formLogin.valid) {
      this.adminService.login(this.formLogin.value.username, this.formLogin.value.password).then((res: any) => {
        this.messageService.add({ key: "toast", severity: 'success', summary: "SUCCESS", detail: "Đăng nhập thành công!" });
        localStorage.setItem("TOKEN", res.data);
        this.router.navigate(['../home'], { relativeTo: this.route });
      }).catch((err: any) => {
        this.messageService.add({ key: "toast", severity: 'error', summary: "FAILED", detail: "Đăng nhập thất bại!" });
      });
    }
  }

}
