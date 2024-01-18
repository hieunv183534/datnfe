import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home-page-new',
  templateUrl: './home-page-new.component.html',
  styleUrls: ['./home-page-new.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class HomePageNewComponent implements OnInit {

  yourItems = [
    { content: 'Xin chào, chúng mình là FSI Connected', imageUrl: '../../../assets/img/GIF/Gif1.gif', positionRight: true, typedText: "" },
    { content: 'Để bắt đầu, chúng ta hãy cùng  tưởng tượng về hình mẫu của một người cộng sự lý tưởng nhé...', imageUrl: '../../../assets/img/GIF/Gif7.gif', positionRight: false, typedText: "" },
    { content: 'Ồ, thật tuyệt! Họ rất đặc biệt phải không nào.', imageUrl: '../../../assets/img/GIF/Gif3.gif', positionRight: true, typedText: "" },
    { content: 'Nhưng suốt thời gian qua, bạn đã gặp được bao nhiêu người như thế... Hoặc gần như thế nhỉ?', imageUrl: '../../../assets/img/GIF/Gif4.gif', positionRight: false, typedText: "" },
    { content: 'Một con số khiêm tốn phải không. Nhưng đừng lo, vì chúng ta giống nhau. FSI Connected hiểu bạn...', imageUrl: '../../../assets/img/GIF/Gif5.gif', positionRight: true, typedText: "" },
    { content: 'Tại FSI Connected, bạn sẽ sớm gặp được những người cộng sự phù hợp. Hãy bắt đầu ngay nào...', imageUrl: '../../../assets/img/GIF/Gif6.gif', positionRight: false, typedText: "" },
  ];
  fullText: string = "Xin chào, chúng mình là FSI Connected.";
  // typedText: string = "";
  typingSpeed: number = 65;
  isShowSidebar: boolean = false;
  showCursor: boolean = true;
  isVisibleLogin: boolean = false;
  isVisibleRegister: boolean = false;
  currentCarouselPage = 0;
  responsiveOptions: any
  constructor() {

  }

  // onCarouselPageChange(event: any) {
  //   const currentIndex = event.page; // Lấy index của slide hiện tại
  //   this.typedText = ''; // Xóa nội dung hiện tại
  //   this.typeText(this.yourItems[currentIndex].content); // Gọi hàm typeText với nội dung mới
  // }

  ngOnInit() {
    this.typeText(this.yourItems[0].content);
  }
  typeText(newContent: string) {
    let i = 0;
    let interval = setInterval(() => {
      this.yourItems[this.currentCarouselPage].typedText += newContent[i++];
      if (i === newContent.length) {
        clearInterval(interval);
        this.showCursor = false;
        // Chuyển sang trang tiếp theo nếu chưa phải trang cuối cùng
        if (this.currentCarouselPage < this.yourItems.length - 1) {
          setTimeout(() => {

            this.currentCarouselPage++;
            // this.typedText = ''; // Xóa nội dung hiện tại
            this.typeText(this.yourItems[this.currentCarouselPage].content); // Bắt đầu gõ nội dung trang mới
          }, 1000)
        }
      }
    }, this.typingSpeed);
  }

  // typeText() {
  //   let i = 0;
  //   let interval = setInterval(() => {
  //     this.typedText += this.yourItems[0].content[i++];
  //     if (i === this.fullText.length) {
  //       clearInterval(interval);
  //       this.showCursor = false; // Hide cursor after typing is complete
  //     }
  //   }, this.typingSpeed);
  // }

}
