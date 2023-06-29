import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventSource = new BehaviorSubject('');
  currentEvent = this.eventSource.asObservable();

  constructor() { }

  changeEvent(event: string) {
    this.eventSource.next(event);
  }

}
