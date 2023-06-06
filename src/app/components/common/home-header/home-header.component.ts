import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {

  isScrolled: boolean = false;
  @Output() login: EventEmitter<any> = new EventEmitter();
  @Output() register: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    window.onscroll = () => {
      this.isScrolled = window.pageYOffset <= 0 ? false : true;
      return () => (window.onscroll = null);
    };
  }

  showRegister() {
    this.register.emit();
  }

  showLogin() {
    this.login.emit();
  }

}
