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


  private reloadStartuperSource = new BehaviorSubject('FSI');
  currentReloadStartuper = this.reloadStartuperSource.asObservable();

  private reloadFilesSource = new BehaviorSubject('FSI');
  currentReloadFiles = this.reloadFilesSource.asObservable();

  private projectFilesSource = new BehaviorSubject<any[]>([]);
  currentProjectFiles = this.projectFilesSource.asObservable();

  private conversationUsersSource = new BehaviorSubject<any[]>([]);
  currentConversationUsers = this.conversationUsersSource.asObservable();

  constructor() { }

  changeEvent(event: string) {
    this.eventSource.next(event);
  }

  showUserDetail(userId: string){
    this.userDetailIdSource.next(userId);
  }

  reloadStartuper(reloadStartuper: string){
    this.reloadStartuperSource.next(reloadStartuper);
  }

  reloadFiles(reloadFiles: string){
    this.reloadFilesSource.next(reloadFiles);
  }

  changeProjectFiles(pjFiles: any[]){
    this.projectFilesSource.next(pjFiles);
  }


  changeListConversationUsers(users: any[]){
    this.conversationUsersSource.next(users);
  }
}
