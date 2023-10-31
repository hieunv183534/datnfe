import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StartuperService } from 'src/app/services/startuper.service';

@Component({
  selector: 'app-startuper-space',
  templateUrl: './startuper-space.component.html',
  styleUrls: ['./startuper-space.component.css']
})
export class StartuperSpaceComponent implements OnInit {

  menus = [{ href: "/startuper/project", title: "Dự án / Ý tưởng" }, { href: "/startuper/startuper/f6b77754-97c0-405f-86a5-f3f4959e2f3a", title: "Nhà khởi nghiệp" }]

  isVisibleRegisterInfo: boolean = false;

  constructor(
    private startuperService: StartuperService
  ) { }

  ngOnInit() {
    this.startuperService.getCheckIsNewProfile().then((res: any) => {
      this.isVisibleRegisterInfo = res.data;
    }).catch((err: any) => {

    });
  }

}
