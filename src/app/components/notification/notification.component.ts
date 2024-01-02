import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  items: any[] = [];
  @Input() display: boolean = false;
  @ViewChild('op') op!: OverlayPanel;
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Vũ Việt gần đây đã đăng một tin.',
        icon: 'pi pi-user',
        avatar: 'https://kms.ctin.vn/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbbaced5fc1-2642-4a85-afdf-8e4de49d2e3e.jpg',
        time:"1 giờ trước",
        command: () => {
          // do something
        },
      },
      {
        label: 'Nguyễn Quang Hiếu đã đăng 2 liên kết.',
        avatar: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-1/356431598_1719331301848920_5923863853146486687_n.jpg?stp=c0.13.200.200a_dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=5740b7&_nc_ohc=R_kBOkU35-4AX9gFf9V&_nc_ht=scontent.fhan14-2.fna&oh=00_AfB5fBN5zI0tgkWISRo4K_xb-BhGh9zYASu_eGipX7mp3g&oe=65985BC2',
        icon: 'pi pi-link',
        time:"1 giờ trước",
        command: () => {
          // do something
        },
      },
      {
        label: 'Nguyễn Thanh Tùng đã nhắc đến bạn và những người theo dõi khác trong một bình luận.',
        icon: 'pi pi-comment',
        avatar: 'http://kms-uat.site:8080/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbba769b405-ec04-48eb-bbff-5903ce15b13e.jpg',
        time:"1 giờ trước",
        command: () => {
          // do something
        },
      },
      {
        label: 'Hôm qua là sinh nhật của Nguyễn Cường và 4 người bạn khác.',
        icon: 'pi pi-gift',
        avatar: 'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-1/411896801_2060340087635748_3815525996138137949_n.jpg?stp=cp6_dst-jpg_p56x56&_nc_cat=102&ccb=1-7&_nc_sid=4da83f&_nc_ohc=Mj8IaoDIzGIAX8p0uKH&_nc_ht=scontent.fhan14-4.fna&oh=00_AfCdn6Sg6vWlfj5qtgo0_1OAdBLQ-9wAjUgbEfNjKZibrg&oe=6598876D',
        time:"1 giờ trước",
        command: () => {
          // do something
        },
      },
      {
        label: 'Bác Dương đã gắn thẻ bạn và những người khác vào một bài viết trong Thủ tục Hải quan.',
        icon: 'pi pi-tag',
        avatar: 'https://fsiconnected.cloud/images/default-avatar.jpg',
        time:"1 giờ trước",
        command: () => {
          // do something
        },
      },
    ];

  }
  toggle(event: any) {
    this.op.toggle(event);
  }

}