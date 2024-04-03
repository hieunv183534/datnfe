import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeHeaderComponent implements OnInit {

  isScrolled: boolean = false;
  isShowSidebar: boolean = false;
  isLogin: boolean = false
  isVisibleLogin: boolean = false;
  isVisibleRegister: boolean = false;
  itemsHeader: MenuItem[] = [];
  menus = [{ href: "/startuper/project", title: "Tìm kiếm dự án" }, { href: "/startuper/startuper/f6b77754-97c0-405f-86a5-f3f4959e2f3a", title: "Tìm kiếm Co-founder" }]

  constructor(
    private router: Router
  ) {
    this.menus.map((menu) => {
      this.itemsHeader.push({
        items: [
          {
            label: menu.title,
            command: () => {
              const token = localStorage.getItem('TOKEN');
              if (token)
                this.router.navigate([`${menu.href}`]);
              else {
                this.isVisibleLogin=true;
              }
            }
          },
        ]
      })
    })
  }

  ngOnInit() {
    window.onscroll = () => {
      this.isScrolled = window.pageYOffset <= 0 ? false : true;
      return () => (window.onscroll = null);
    };
    this.checkingLogin();
  }
  checkingLogin() {
    const token = localStorage.getItem('TOKEN');
    this.isLogin = token ? true : false

  }
  showRegister() {
    this.isVisibleRegister = true
  }

  showLogin() {
    this.isVisibleLogin = true
  }

}
