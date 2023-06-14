import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-project-member-invite',
  templateUrl: './list-project-member-invite.component.html',
  styleUrls: ['./list-project-member-invite.component.css']
})
export class ListProjectMemberInviteComponent implements OnInit {

  members: any[] = [
    {
      avatarUrl: "http://localhost:7777/images/525a6015-6ee2-4d33-a924-e586ec53c308.png",
      name: "Nguyễn Văn Hiếu",
      key: "0971883025"
    },
    {
      avatarUrl: "http://localhost:7777/images/525a6015-6ee2-4d33-a924-e586ec53c308.png",
      name: "Nguyễn Văn Hiếu",
      key: "0971883025"
    },
    {
      avatarUrl: "http://localhost:7777/images/525a6015-6ee2-4d33-a924-e586ec53c308.png",
      name: "Nguyễn Văn Hiếu",
      key: "0971883025"
    },
    {
      avatarUrl: "http://localhost:7777/images/525a6015-6ee2-4d33-a924-e586ec53c308.png",
      name: "Nguyễn Văn Hiếu",
      key: "0971883025"
    },
    {
      avatarUrl: "http://localhost:7777/images/525a6015-6ee2-4d33-a924-e586ec53c308.png",
      name: "Nguyễn Văn Hiếu",
      key: "0971883025"
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
