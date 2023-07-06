import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalService {

  constructor() { }

  private onTestSource = new BehaviorSubject<any>('FSI');
  currentOnTest = this.onTestSource.asObservable();

  changeOnTest(data: any) {
    this.onTestSource.next(data);
  }

}
