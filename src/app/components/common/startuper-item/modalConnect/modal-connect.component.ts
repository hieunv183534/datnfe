import { Component, EventEmitter, Output, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-modal-connect',
  templateUrl: './modal-connect.component.html',
  styleUrls: ['./modal-connect.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ModalConnectComponent),
      multi: true
    }
  ]
})
export class ModalConnectComponent implements OnInit {
  @Input() display: boolean = false;
  styleDialog: any = { width:'40vw' }
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() requestConnect: EventEmitter<any> = new EventEmitter();
  innerWidth: any;

  constructor() { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth <= 767){
      this.styleDialog = {}
    }
  }

}
