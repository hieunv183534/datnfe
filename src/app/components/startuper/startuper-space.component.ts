import { Component, OnInit } from '@angular/core';
import { StartuperService } from 'src/app/services/startuper.service';

@Component({
  selector: 'app-startuper-space',
  templateUrl: './startuper-space.component.html',
  styleUrls: ['./startuper-space.component.css']
})
export class StartuperSpaceComponent implements OnInit {

  menus = [{ href: "/startuper/project", title: "Dự án / Ý tưởng" }, { href: "/startuper/startuper", title: "Nhà khởi nghiệp" },
  { href: "/startuper/investor", title: "Nhà đầu tư" }]

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
