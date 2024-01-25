import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css'], 
  encapsulation: ViewEncapsulation.None
})
export class HomeHeaderComponent implements OnInit {

  isScrolled: boolean = false;
  isShowSidebar: boolean = false;
  isLogin: boolean = false
  isVisibleLogin: boolean = false;
  isVisibleRegister: boolean = false;

  constructor() { }

  ngOnInit() {
    window.onscroll = () => {
      this.isScrolled = window.pageYOffset <= 0 ? false : true;
      return () => (window.onscroll = null);
    };
    this.checkingLogin();
  }
  checkingLogin() {
    const token = localStorage.getItem('TOKEN');
    this.isLogin = token ? true : false


  }
  showRegister() {
    this.isVisibleRegister = true
  }

  showLogin() {
    this.isVisibleLogin = true
  }

}
