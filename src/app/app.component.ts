import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { UserDto } from './model/user.class';
import { EventService } from './services/event.service';
import { NavigationEnd, Router } from '@angular/router';
import { SignalService } from './services/signal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fsi';
  userId: string = "";
  isVisibleUserDetail: boolean = false;
  thisRouteUrl?: string = "";
  isShowFooter?: boolean = true;

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private eventService: EventService,
    private signalService: SignalService
  ) { }

  ngOnInit() {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.thisRouteUrl = this.router.url;
        if (this.thisRouteUrl.includes("chat/") || this.thisRouteUrl.includes("admin")) {
          this.isShowFooter = false;
        } else {
          this.isShowFooter = true;
        }
      }
    });

    this.primengConfig.ripple = true;
    this.eventService.currentUserDetailId.subscribe(userDetailId => {
      if (userDetailId != "FSI") {
        this.userId = userDetailId;
        this.isVisibleUserDetail = true;
      }
    });
  }
}
