import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.css']
})
export class UpdateUserInfoComponent implements OnInit {

  @Input() display: boolean = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  areas: any[] = FsiValues.areas;

  formBaseInfo: FormGroup = this.fb.group({});

  activeIndex: number = 0;
  constructor(
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  next(){

  }

  back(){

  }

}
