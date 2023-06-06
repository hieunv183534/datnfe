import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  isScrolled: boolean = false;
  thisRouteUrl: string = "";

  @Input() menuData: { href: string, title: string }[] = [];

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
  }

  toHome() {
    this.router.navigate(['./']);
  }

}
