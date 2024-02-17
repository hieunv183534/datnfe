import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  forwardRef,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { UuidStartuperModeAdmin, UuidStartuperModeFromMe, UuidStartuperModeNew, UuidStartuperModeOFMe, UuidStartuperModeToMe } from 'src/app/model/enum';
@Component({
  selector: 'app-modal-detail-connect',
  templateUrl: './modal-detail-connect.component.html',
  styleUrls: ['./modal-detail-connect.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ModalDetailConnectComponent),
      multi: true,
    },
  ],
})
export class ModalDetailConnectComponent implements OnInit {
  @Input() display: boolean = false;
  @Input() mode: any;
  @Input() friendStatus: any;
  styleDialog: any = { width: '40vw' };
  @Output() close: EventEmitter<any> = new EventEmitter();
  // @Output() requestConnect: EventEmitter<any> = new EventEmitter();
  innerWidth: any;
  UuidStartuperModeNew = UuidStartuperModeNew;
  UuidStartuperModeOFMe = UuidStartuperModeOFMe;
  UuidStartuperModeFromMe = UuidStartuperModeFromMe;
  UuidStartuperModeToMe = UuidStartuperModeToMe;
  UuidStartuperModeAdmin = UuidStartuperModeAdmin;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 767) {
      this.styleDialog = {};
    }
  }
}
