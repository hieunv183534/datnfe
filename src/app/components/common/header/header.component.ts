import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { StartuperService } from 'src/app/services/startuper.service';
import { NotificationComponent } from '../../notification/notification.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class HeaderComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  isScrolled: boolean = false;
  thisRouteUrl: string = "";
  items: MenuItem[] = [];
  itemsHeader: MenuItem[] = [];
  itemsAsideMenu: MenuItem[] = [];
  userInfo: any = {};
  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;

  @Input() menuData: { href: string, title: string }[] = [];

  isShowUpdateInfo: boolean = false;
  isNewProfile: boolean = false;
  isShowSidebar: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  
  goToChat(){
    this.router.navigate(['/startuper/chat/0/0']);
  }

  ngOnInit() {
    this.isNewProfile = JSON.parse(localStorage.getItem("IS_NEW_PROFILE")??'false');
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.thisRouteUrl = this.router.url;
      }
    });

    // window.onscroll = () => {
    //   this.isScrolled = window.pageYOffset <= 0 ? false : true;
    //   return () => (window.onscroll = null);
    // };

    this.userInfo = this.getDecodedAccessToken();
    this.items = [
      {
        label: this.userInfo.name,
        items: [
          {
            label: 'Thông tin cá nhân',
            icon: 'pi pi-cog',
            command: () => {
              // this.isShowUpdateInfo = true;
              this.router.navigate(['./profile/' + this.userInfo.nameid]);
            }
          },
          {
            label: 'Lịch sử tìm kiếm',
            icon: 'pi pi-history',
            command: () => {
              this.router.navigate(['/startuper/history-search']);
            }
          },
          {
            label: 'Đăng xuất',
            icon: 'pi pi-sign-out',
            command: () => {
              this.router.navigate(['./']);
              localStorage.clear();
            }
          }
        ]
      }
    ];
    this.menuData.map((menu) => {
      this.itemsHeader.push({
        items: [
          {
            label: menu.title,
            command: () => {
              this.router.navigate([`${menu.href}`]);
            }
          },
        ]
      })
    })
    this.itemsAsideMenu = [
      {
        label: 'Kết nối',
        items: this.menuData.map((menu) => ({
          label: menu.title,
          command: () => {
            this.router.navigate([`${menu.href}`]);
            this.isShowSidebar = false
          },
        })),
      },
      {
        label: 'Cộng đồng',
      },
      {
        label: 'Hỗ trợ',
      },

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
  onBellClick(event: any) {
    this.notificationComponent.toggle(event);
  }

}
