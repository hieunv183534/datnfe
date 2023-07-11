import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  items: MenuItem[] = [];

  settings: MenuItem[] = [];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: "Dự án/ý tưởng",
        icon: "pi pi-file-pdf",
        routerLink: "project"
      },
      {
        label: "Nhà khởi nghiệp",
        icon: "pi pi-user",
        routerLink: "startuper"
      },
      {
        label: "Quản trị viên",
        icon: "pi pi-cog",
        routerLink: "admin"
      }
    ];

    this.settings = [
      {
        icon: "pi pi-info-circle",
        label: "Thông tin"
      },
      {
        icon: "pi pi-sign-out",
        label: "Đăng xuất",
        routerLink: "../login"
      }
    ]
  }

}
