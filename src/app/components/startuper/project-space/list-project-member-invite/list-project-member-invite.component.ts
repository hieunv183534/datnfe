import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-project-member-invite',
  templateUrl: './list-project-member-invite.component.html',
  styleUrls: ['./list-project-member-invite.component.css']
})
export class ListProjectMemberInviteComponent implements OnInit {

  members: any[] = []

  constructor() { }

  ngOnInit() {
  }

}
