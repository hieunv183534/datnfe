import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StartuperService } from 'src/app/services/startuper.service';
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
    private startuperService: StartuperService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.startuperService.getCheckIsNewProfile().then((res: any) => {
      let currentUserId = this.getDecodedAccessToken().nameid;
      if (res.data) {
        // hiện dialog thông báo
        this.router.navigate(['../profile/' + currentUserId], { relativeTo: this.route });
      }
    }).catch((err: any) => {

    });
  }

  getDecodedAccessToken(): any {
    try {
      return jwt_decode(localStorage.getItem("TOKEN") ?? "");
    } catch (Error) {
      return null;
    }
  }

}
