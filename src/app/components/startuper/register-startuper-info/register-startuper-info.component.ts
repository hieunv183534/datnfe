import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StartuperService } from 'src/app/services/startuper.service';

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

  constructor(private startuperService : StartuperService) { }

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

  onFileSelected(e: any){
    console.log(e.target.files[0]);
    this.startuperService.uploadAvatar(e.target.files[0]).then((res: any) => {
      alert(111);
    }).catch((err: any) => {
      alert(222);
    });
  }

}
