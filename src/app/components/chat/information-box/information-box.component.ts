import { MessageDto } from './../../../model/chat.class';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ConversationDto } from 'src/app/model/chat.class';
import { ChatService } from 'src/app/services/chat.service';
import { Util } from 'src/app/shared/util/util';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-information-box',
  templateUrl: './information-box.component.html',
  styleUrls: ['./information-box.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class InformationBoxComponent implements OnInit {
  items: any[] = [];
  files: any[] = [];
  links: any[] = [];
  pinnedMessage: MessageDto[] = [];
  display: boolean = false;
  unpinMessId: string | undefined = '';
  @Input() conversation?: ConversationDto
  @Input() isMobile?: boolean
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private chatService: ChatService,
    private messageService: MessageService
  ) { }
  getDateTime(d: any) {
    return Util.getDateTime(new Date(d));
  }
  unpinMessage() {
    this.chatService.pinMessage({ messageId: this.unpinMessId, isPin: false }).then(() => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Bỏ ghim thành công!",
      });
      this.openListPinnedMessage();
      this.unpinMessId = ''
    }).catch(()=>{
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Bỏ ghim thất bại!",
      });
    })

  }
  openListPinnedMessage() {
    console.log(this.conversation?.id);

    this.display = true;
    this.chatService.getListPinMessageByConversation(this.conversation?.id ?? '').then((res: any) => {
      this.pinnedMessage = res.data
    })

  }
  goToUserPage(userId:string|undefined) {
    console.log(userId);
    // this.router.navigate(['../startuper'], { relativeTo: this.route });
  }
  ngOnInit(): void {
    this.items = [
      {
        label: 'Vũ Việt gần đây đã đăng một tin.',
        icon: 'pi pi-user',
        avatar: 'https://kms.ctin.vn/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbbaced5fc1-2642-4a85-afdf-8e4de49d2e3e.jpg',
        unRead: true,
        time: "1 giờ trước",
        command: () => {
          // do something
        },
      },
      {
        label: 'Nguyễn Quang Hiếu đã đăng 2 liên kết.',
        avatar: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-1/356431598_1719331301848920_5923863853146486687_n.jpg?stp=c0.13.200.200a_dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=5740b7&_nc_ohc=R_kBOkU35-4AX9gFf9V&_nc_ht=scontent.fhan14-2.fna&oh=00_AfB5fBN5zI0tgkWISRo4K_xb-BhGh9zYASu_eGipX7mp3g&oe=65985BC2',
        icon: 'pi pi-link',
        unRead: true,
        time: "1 giờ trước",
        command: () => {
          // do something
        },
      },
      {
        label: 'Nguyễn Thanh Tùng đã nhắc đến bạn và những người theo dõi khác trong một bình luận.',
        icon: 'pi pi-comment',
        avatar: 'http://kms-uat.site:8080/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbba769b405-ec04-48eb-bbff-5903ce15b13e.jpg',
        unRead: false,
        time: "1 giờ trước",
        command: () => {
          console.log("Hêhehe");

        },
      },
      {
        label: 'Hôm qua là sinh nhật của Nguyễn Cường và 4 người bạn khác.',
        icon: 'pi pi-gift',
        avatar: 'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-1/411896801_2060340087635748_3815525996138137949_n.jpg?stp=cp6_dst-jpg_p56x56&_nc_cat=102&ccb=1-7&_nc_sid=4da83f&_nc_ohc=Mj8IaoDIzGIAX8p0uKH&_nc_ht=scontent.fhan14-4.fna&oh=00_AfCdn6Sg6vWlfj5qtgo0_1OAdBLQ-9wAjUgbEfNjKZibrg&oe=6598876D',
        unRead: true,
        time: "1 giờ trước",
        command: () => {
          // do something
        },
      },
      {
        label: 'Bác Dương đã gắn thẻ bạn và những người khác vào một bài viết trong Thủ tục Hải quan.',
        icon: 'pi pi-tag',
        avatar: 'https://fsiconnected.cloud/images/default-avatar.jpg',
        unRead: false,
        time: "1 giờ trước",
        command: () => {
          // do something
        },
      },
      {
        label: 'Vũ Việt gần đây đã đăng một tin.',
        icon: 'pi pi-user',
        avatar: 'https://kms.ctin.vn/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbbaced5fc1-2642-4a85-afdf-8e4de49d2e3e.jpg',
        unRead: true,
        time: "1 giờ trước",
        command: () => {
          // do something
        },
      },
      {
        label: 'Nguyễn Quang Hiếu đã đăng 2 liên kết.',
        avatar: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-1/356431598_1719331301848920_5923863853146486687_n.jpg?stp=c0.13.200.200a_dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=5740b7&_nc_ohc=R_kBOkU35-4AX9gFf9V&_nc_ht=scontent.fhan14-2.fna&oh=00_AfB5fBN5zI0tgkWISRo4K_xb-BhGh9zYASu_eGipX7mp3g&oe=65985BC2',
        icon: 'pi pi-link',
        unRead: true,
        time: "1 giờ trước",
        command: () => {
          // do something
        },
      },
      {
        label: 'Nguyễn Thanh Tùng đã nhắc đến bạn và những người theo dõi khác trong một bình luận.',
        icon: 'pi pi-comment',
        avatar: 'http://kms-uat.site:8080/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbba769b405-ec04-48eb-bbff-5903ce15b13e.jpg',
        unRead: false,
        time: "1 giờ trước",
        command: () => {
          console.log("Hêhehe");

        },
      },
      {
        label: 'Hôm qua là sinh nhật của Nguyễn Cường và 4 người bạn khác.',
        icon: 'pi pi-gift',
        avatar: 'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-1/411896801_2060340087635748_3815525996138137949_n.jpg?stp=cp6_dst-jpg_p56x56&_nc_cat=102&ccb=1-7&_nc_sid=4da83f&_nc_ohc=Mj8IaoDIzGIAX8p0uKH&_nc_ht=scontent.fhan14-4.fna&oh=00_AfCdn6Sg6vWlfj5qtgo0_1OAdBLQ-9wAjUgbEfNjKZibrg&oe=6598876D',
        unRead: true,
        time: "1 giờ trước",
        command: () => {
          // do something
        },
      },
      {
        label: 'Bác Dương đã gắn thẻ bạn và những người khác vào một bài viết trong Thủ tục Hải quan.',
        icon: 'pi pi-tag',
        avatar: 'https://fsiconnected.cloud/images/default-avatar.jpg',
        unRead: false,
        time: "1 giờ trước",
        command: () => {
          // do something
        },
      },
      {
        label: 'Vũ Việt gần đây đã đăng một tin.',
        icon: 'pi pi-user',
        avatar: 'https://kms.ctin.vn/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbbaced5fc1-2642-4a85-afdf-8e4de49d2e3e.jpg',
        unRead: true,
        time: "1 giờ trước",
        command: () => {
          // do something
        },
      },
      {
        label: 'Nguyễn Quang Hiếu đã đăng 2 liên kết.',
        avatar: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-1/356431598_1719331301848920_5923863853146486687_n.jpg?stp=c0.13.200.200a_dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=5740b7&_nc_ohc=R_kBOkU35-4AX9gFf9V&_nc_ht=scontent.fhan14-2.fna&oh=00_AfB5fBN5zI0tgkWISRo4K_xb-BhGh9zYASu_eGipX7mp3g&oe=65985BC2',
        icon: 'pi pi-link',
        unRead: true,
        time: "1 giờ trước",
        command: () => {
          // do something
        },
      },
      {
        label: 'Nguyễn Thanh Tùng đã nhắc đến bạn và những người theo dõi khác trong một bình luận.',
        icon: 'pi pi-comment',
        avatar: 'http://kms-uat.site:8080/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbba769b405-ec04-48eb-bbff-5903ce15b13e.jpg',
        unRead: false,
        time: "1 giờ trước",
        command: () => {
          console.log("Hêhehe");

        },
      },
      {
        label: 'Hôm qua là sinh nhật của Nguyễn Cường và 4 người bạn khác.',
        icon: 'pi pi-gift',
        avatar: 'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-1/411896801_2060340087635748_3815525996138137949_n.jpg?stp=cp6_dst-jpg_p56x56&_nc_cat=102&ccb=1-7&_nc_sid=4da83f&_nc_ohc=Mj8IaoDIzGIAX8p0uKH&_nc_ht=scontent.fhan14-4.fna&oh=00_AfCdn6Sg6vWlfj5qtgo0_1OAdBLQ-9wAjUgbEfNjKZibrg&oe=6598876D',
        unRead: true,
        time: "1 giờ trước",
        command: () => {
          // do something
        },
      },
      {
        label: 'Bác Dương đã gắn thẻ bạn và những người khác vào một bài viết trong Thủ tục Hải quan.',
        icon: 'pi pi-tag',
        avatar: 'https://fsiconnected.cloud/images/default-avatar.jpg',
        unRead: false,
        time: "1 giờ trước",
        command: () => {
          // do something
        },
      },
    ];
    this.files = [
      {
        title: 'thoikhos.doc',
        size: "166kb",
        command: () => {
          // do something
        },
      },
      {
        title: 'doantotnghie.xlxsdoantotnghie.xlxsdoantotnghie.xlxs',
        size: "166kb",
        command: () => {
          // do something
        },
      },
      {
        title: 'fsiconncect.pdf',
        size: "166kb",
        command: () => {
          // do something
        },
      },
      {
        title: 'thoikhos.doc',
        size: "166kb",
        command: () => {
          // do something
        },
      },
    ]
    this.links = [
      {
        title: 'http://localhost:4200/#/startuper/chat/0/0',
        url: 'https://primeflex.org/textcolor',
        command: () => {
          // do something
        },
      },
      {
        title: 'doantotnghie.xlxsdoantotnghie.xlxsdoantotnghie.xlxs',
        size: "166kb",
        url: 'https://chat.openai.com/c/cfa96398-4b37-428d-bcf1-769ce074a3fa',
        command: () => {
          // do something
        },
      },
      {
        title: 'fsiconncect.pdf',
        size: "166kb",
        url: 'https://docs.google.com/spreadsheets/d/14toh0f2KmpwowmYSeJLODs5Rol3lFUkgqn8QgW6Yu3M/edit#gid=312801768',
        command: () => {
          // do something
        },
      },
      {
        title: 'thoikhos.doc',
        size: "166kb",
        url: 'https://primeflex.org/textcolor',
        command: () => {
          // do something
        },
      },
    ]
    // this.pinnedMessage = [
    //   {
    //     title: "tắt thông báo(tắt trong bao lâu), xóa cuộc trò chuyện, rip, ghim tin trong chat",
    //     avatar: 'https://kms.ctin.vn/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbbaced5fc1-2642-4a85-afdf-8e4de49d2e3e.jpg',
    //     sender: "văn hiếu",
    //     time: "2023-12-22T16:08:17.682627"
    //   },
    //   {
    //     title: "lưu  trữ trò chuyện, ghim, đánh dấu chưa đọc,tắt thông báo(tắt trong bao lâu), xóa cuộc trò chuyện, rip, ghim tin trong chat",
    //     avatar: 'https://kms.ctin.vn/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbbaced5fc1-2642-4a85-afdf-8e4de49d2e3e.jpg',
    //     sender: "văn hiếu",
    //     time: "2023-12-22T16:08:17.682627"

    //   },
    //   {
    //     title: " ghim, đánh dấu chưa đọc,tắt thông báo(tắt trong bao lâu), xóa cuộc trò chuyn",
    //     avatar: 'https://kms.ctin.vn/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbbaced5fc1-2642-4a85-afdf-8e4de49d2e3e.jpg',
    //     sender: "văn hiếu",
    //     time: "2023-12-22T16:08:17.682627"

    //   },
    //   {
    //     title: "listPinned listPinnedlistPinned listPinned listPinned",
    //     avatar: 'https://kms.ctin.vn/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbbaced5fc1-2642-4a85-afdf-8e4de49d2e3e.jpg',
    //     sender: "văn hiếu",
    //     time: "2023-12-22T16:08:17.682627"
    //   },
    //   {
    //     title: "l ghim, đánh dấu chưa đọc,tắt thông báo(tắt trong bao lâu), xóa cuộc trò chuyn",
    //     avatar: 'https://kms.ctin.vn/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbbaced5fc1-2642-4a85-afdf-8e4de49d2e3e.jpg',
    //     sender: "văn hiếu",
    //     time: "2023-12-22T16:08:17.682627"
    //   },
    //   {
    //     title: "tắt thông báo(tắt trong bao lâu), xóa cuộc trò chuyện, rip, ghim tin trong chat",
    //     avatar: 'https://kms.ctin.vn/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbbaced5fc1-2642-4a85-afdf-8e4de49d2e3e.jpg',
    //     sender: "văn hiếu",
    //     time: "2023-12-22T16:08:17.682627"
    //   },
    //   {
    //     title: "lưu  trữ trò chuyện, ghim, đánh dấu chưa đọc,tắt thông báo(tắt trong bao lâu), xóa cuộc trò chuyện, rip, ghim tin trong chat",
    //     avatar: 'https://kms.ctin.vn/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbbaced5fc1-2642-4a85-afdf-8e4de49d2e3e.jpg',
    //     sender: "văn hiếu",
    //     time: "2023-12-22T16:08:17.682627"

    //   },
    //   {
    //     title: " ghim, đánh dấu chưa đọc,tắt thông báo(tắt trong bao lâu), xóa cuộc trò chuyn",
    //     avatar: 'https://kms.ctin.vn/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbbaced5fc1-2642-4a85-afdf-8e4de49d2e3e.jpg',
    //     sender: "văn hiếu",
    //     time: "2023-12-22T16:08:17.682627"

    //   },
    //   {
    //     title: "listPinned listPinnedlistPinned listPinned listPinned",
    //     avatar: 'https://kms.ctin.vn/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbbaced5fc1-2642-4a85-afdf-8e4de49d2e3e.jpg',
    //     sender: "văn hiếu",
    //     time: "2023-12-22T16:08:17.682627"
    //   },
    //   {
    //     title: "l ghim, đánh dấu chưa đọc,tắt thông báo(tắt trong bao lâu), xóa cuộc trò chuyn",
    //     avatar: 'https://kms.ctin.vn/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbbaced5fc1-2642-4a85-afdf-8e4de49d2e3e.jpg',
    //     sender: "văn hiếu",
    //     time: "2023-12-22T16:08:17.682627"
    //   },
    // ]
  }

}

  // handleScroll(event: Event) {
  //   const target = event.target as HTMLDivElement;
  //   const scrollPosition = target.scrollTop;
  //   const elementHeight = target.scrollHeight;
  //   const clientHeight = target.clientHeight;
  //   console.log(scrollPosition);

  //   if (scrollPosition / (elementHeight - clientHeight) < 0.1 && !this.isCalled && !this.fullMessage) {
  //     // if (scrollPosition < 200 && !this.isCalled && !this.fullMessage) {

  //     this.isCalled = true;
  //     this.skipCount += this.maxResultCount;
  //     // this.getListMessage();
  //   } else {
  //     this.isCalled = false;
  //   }
  //   if (scrollPosition / (elementHeight - clientHeight) >= 0.8) {
  //     const element = this.elementRef.nativeElement.querySelector('.message-content');
  //     element.scrollTo({ top: element.scrollHeight - element.clientHeight });
  //   }
  // }