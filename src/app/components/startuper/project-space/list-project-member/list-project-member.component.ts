import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-project-member',
  templateUrl: './list-project-member.component.html',
  styleUrls: ['./list-project-member.component.css']
})
export class ListProjectMemberComponent implements OnInit {
  @Output() addNewMember: EventEmitter<any> = new EventEmitter();
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

  inviteModes: any[] =[
    {
      name: "Đã yêu cầu"
    },
    {
      name: "Được yêu cầu"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
