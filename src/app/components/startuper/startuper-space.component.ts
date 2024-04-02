import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startuper-space',
  templateUrl: './startuper-space.component.html',
  styleUrls: ['./startuper-space.component.css']
})
export class StartuperSpaceComponent implements OnInit {

  menus = [{ href: "/startuper/project", title: "Tìm kiếm dự án" }, { href: "/startuper/startuper/f6b77754-97c0-405f-86a5-f3f4959e2f3a", title: "Tìm kiếm Co-founder" }]

  // isVisibleRegisterInfo: boolean = false;

  constructor(

  ) { }

  ngOnInit() {

  }

}
