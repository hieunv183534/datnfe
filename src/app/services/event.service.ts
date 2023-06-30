import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../model/user.class';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventSource = new BehaviorSubject('');
  currentEvent = this.eventSource.asObservable();

  private userDetailIdSource = new BehaviorSubject("FSI");
  currentUserDetailId = this.userDetailIdSource.asObservable();

  constructor() { }

  changeEvent(event: string) {
    this.eventSource.next(event);
  }

  showUserDetail(userId: string){
    this.userDetailIdSource.next(userId);
  }

}
