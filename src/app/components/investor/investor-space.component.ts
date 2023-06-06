import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-investor-space',
  templateUrl: './investor-space.component.html',
  styleUrls: ['./investor-space.component.css']
})
export class InvestorSpaceComponent implements OnInit {

  menus = [{href: "/investor/project", title: "Dự án / Ý tưởng"},{href: "/investor/startuper", title: "Nhà khởi nghiệp"}]

  constructor() { }

  ngOnInit() {
  }

}
