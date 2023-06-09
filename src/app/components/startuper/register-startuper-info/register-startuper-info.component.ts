import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register-startuper-info',
  templateUrl: './register-startuper-info.component.html',
  styleUrls: ['./register-startuper-info.component.css']
})
export class RegisterStartuperInfoComponent implements OnInit {

  @Input() display: boolean = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();

  activeIndex: number = 0;

  constructor() { }

  ngOnInit() {
  }


  hide() {
    this.close.emit();
  }

  save() {
    this.submit.emit();
  }

  back() {
    if (this.activeIndex > 0)
      this.activeIndex--;
  }

  next() {
    if (this.activeIndex < 3)
      this.activeIndex++;
  }

}
