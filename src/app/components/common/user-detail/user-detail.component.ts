import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StartuperDto } from 'src/app/model/startuper.class';
import { UserDto } from 'src/app/model/user.class';
import { StartuperService } from 'src/app/services/startuper.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() visible: boolean = false;
  @Input() userId: string = "";
  @Output() close: EventEmitter<any> = new EventEmitter();

  startuperInfo: StartuperDto = {};
  projectsAsStartuper: any[] = [];
  constructor(
    private startuperService: StartuperService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.startuperService.getUserDetail(this.userId).then((res: any) => {
      console.log(res.data);
      this.startuperInfo = res.data.startuperInfo;
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy thông tin người dùng thất bại. vui lòng thử lại!",
      });
      this.close.emit();
    });
  }


  hide() {
    this.close.emit();
  }
}
