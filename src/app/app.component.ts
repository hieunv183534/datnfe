import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { UserDto } from './model/user.class';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fsi';
  userId: string = "";
  isVisibleUserDetail: boolean = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.eventService.currentUserDetailId.subscribe(userDetailId => {
      if (userDetailId != "FSI") {
        this.userId = userDetailId;
        this.isVisibleUserDetail = true;
      }
    });
  }
}
