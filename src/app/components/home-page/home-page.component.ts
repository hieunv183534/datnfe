import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  isVisibleLogin: boolean = false;
  isVisibleRegister: boolean = false;
  slideIndex: number = 1;

  imagesIndex = [1, 2, 3];

  constructor() { }

  ngOnInit() {
  }

  moveDot(index: any) {
    this.slideIndex = index;
  }


}
