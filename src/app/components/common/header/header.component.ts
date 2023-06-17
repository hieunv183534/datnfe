import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  isScrolled: boolean = false;
  thisRouteUrl: string = "";
  items: MenuItem[] = [];
  userInfo: any = {};

  @Input() menuData: { href: string, title: string }[] = [];

  isShowUpdateInfo: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    let obs = this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.thisRouteUrl = this.router.url;
      }
    });
    this.sub.add(obs);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    window.onscroll = () => {
      this.isScrolled = window.pageYOffset <= 0 ? false : true;
      return () => (window.onscroll = null);
    };



    this.userInfo = this.getDecodedAccessToken();
    this.items = [
      {
        label: this.userInfo.name,
        items: [
          {
            label: 'Thông tin cá nhân',
            icon: 'pi pi-cog',
            command: ()=>{
              // this.isShowUpdateInfo = true;
            }
          },
          {
            label: 'Đăng xuất',
            icon: 'pi pi-sign-out'
          }
        ]
      }
    ];
  }

  toHome() {
    this.router.navigate(['./']);
  }

  getDecodedAccessToken(): any {
    try {
      return jwt_decode(localStorage.getItem("TOKEN") ?? "");
    } catch (Error) {
      return null;
    }
  }

}
