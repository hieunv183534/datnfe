import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-startuper-space',
  templateUrl: './startuper-space.component.html',
  styleUrls: ['./startuper-space.component.css']
})
export class StartuperSpaceComponent implements OnInit {

  menus = [{ href: "/startuper/project", title: "Tìm kiếm dự án" }, { href: "/startuper/startuper/f6b77754-97c0-405f-86a5-f3f4959e2f3a", title: "Tìm kiếm Co-founder" }]

  // isVisibleRegisterInfo: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    const token = localStorage.getItem('TOKEN');
    if (!token)
      this.router.navigate(['../homepage'], { relativeTo: this.route });

  }

  ngOnInit() {

    if (localStorage.getItem("IS_NEW_PROFILE") == 'true' && localStorage.getItem("REMIND_INFO") == 'true') {
      let currentUserId = this.getDecodedAccessToken().nameid;
      localStorage.setItem("REMIND_INFO", 'false');
      this.router.navigate(['./profile/' + currentUserId]);
    }
  }

  getDecodedAccessToken(): any {
    try {
      return jwt_decode(localStorage.getItem("TOKEN") ?? "");
    } catch (Error) {
      return null;
    }
  }
}
