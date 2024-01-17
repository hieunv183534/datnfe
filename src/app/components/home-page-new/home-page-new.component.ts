import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home-page-new',
  templateUrl: './home-page-new.component.html',
  styleUrls: ['./home-page-new.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class HomePageNewComponent implements OnInit {
  items = [
    { text: 'Xin chào, chúng mình là FSI Connected', imageUrl: '../../../assets//img//hello.gif' },
    { text: 'Nội dung cho slide thứ hai', imageUrl: '../../../assets//img//hello.gif' }
    // Thêm các item khác theo mẫu trên nếu cần
  ];
  fullText: string = "Xin chào, chúng mình là FSI Connected.";
  typedText: string = "";
  typingSpeed: number = 65;
  isShowSidebar: boolean = false;
  showCursor: boolean = true;
  isVisibleLogin: boolean = false;
  isVisibleRegister: boolean = false;
  constructor() {
    this.typeText();
  }

  ngOnInit() {
  }
  typeText() {
    let i = 0;
    let interval = setInterval(() => {
      this.typedText += this.items[0].text[i++];
      if (i === this.fullText.length) {
        clearInterval(interval);
        this.showCursor = false; // Hide cursor after typing is complete
      }
    }, this.typingSpeed);
  }

}
