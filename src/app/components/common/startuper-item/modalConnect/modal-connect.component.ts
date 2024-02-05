import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { FsiValues } from 'src/app/shared/util/util';
@Component({
  selector: 'app-modal-connect',
  templateUrl: './modal-connect.component.html',
  styleUrls: ['./modal-connect.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ModalConnectComponent),
      multi: true,
    },
  ],
})
export class ModalConnectComponent implements OnInit {
  @Input() display: boolean = false;
  styleDialog: any = { width: '40vw' };
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() requestConnect: EventEmitter<any> = new EventEmitter();
  suggestOpen: any = FsiValues.suggestOpen;
  suggestContent: any = [];
  suggestEnd: any = [];
  choiceContent: any = FsiValues.suggestContent;
  choiceEnd: any = FsiValues.suggestEnd;
  innerWidth: any;
  formConnect: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formConnect = this.fb.group({
      suggestOpen: [null, 0],
      suggestContent: [null, 0],
      suggestEnd: [null, 0],
      content: '',
    });

    for (let i = 0; i < this.choiceContent.length; i++) {
      if (this.choiceContent[i].name.length > 50) {
        this.suggestContent.push({
          name: this.choiceContent[i].name.slice(0, 50) + '...',
          value: this.choiceContent[i].value,
        });
      } else {
        this.suggestContent.push({
          name: this.choiceContent[i].name,
          value: this.choiceContent[i].value,
        });
      }
    }

    for (let i = 0; i < this.choiceEnd.length; i++) {
      if (this.choiceEnd[i].name.length > 50) {
        this.suggestEnd.push({
          name: this.choiceEnd[i].name.slice(0, 50) + '...',
          value: this.choiceEnd[i].value,
        });
      } else {
        this.suggestEnd.push({
          name: this.choiceEnd[i].name,
          value: this.choiceEnd[i].value,
        });
      }
    }

    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 767) {
      this.styleDialog = {};
    }
  }

  changeContent() {
    for (let i = 0; i < this.suggestOpen.length; i++) {
      if (this.formConnect.value.suggestOpen) {
        if (this.formConnect.value.suggestOpen == this.suggestOpen[i].value) {
          this.formConnect.value.content =
            this.suggestOpen[i].name.toString() + '\n';
        }
      }
    }
    for (let i = 0; i < this.choiceContent.length; i++) {
      if (this.formConnect.value.suggestContent) {
        if (
          this.formConnect.value.suggestContent == this.choiceContent[i].value
        ) {
          this.formConnect.value.content +=
            this.choiceContent[i].name.toString() + '\n';
        }
      }
    }
    for (let i = 0; i < this.choiceEnd.length; i++) {
      if (this.formConnect.value.suggestEnd) {
        if (this.formConnect.value.suggestEnd == this.choiceEnd[i].value) {
          this.formConnect.value.content +=
            this.choiceEnd[i].name.toString() + '\n';
        }
      }
    }
  }
}
