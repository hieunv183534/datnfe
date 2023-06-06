import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessageType } from '../model/enum';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {

  constructor(private _router: Router, private _messageService: MessageService) {
    super(_router, _messageService);
    this.apiController = 'fsi/chat';
  }

  addConversation(body: any) {
    return this.BaseAPIConfig.post(`${this.apiController}/conversation`, body);
  }

  addUserToConversation(userId: string, conversationId: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/user-to-conversation?userId=${userId}&conversationId=${conversationId}`, {});
  }

  getListConversation(filter: string, skipCount: number, maxResultCount: number) {
    let _filter = filter ? `&filter=${filter}` : "";
    return this.BaseAPIConfig.get(`${this.apiController}/conversation?skipCount=${skipCount}&maxResultCount=${maxResultCount}${_filter}`, {});
  }

  sendMessageToUser(type: MessageType, content: string, targetId: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/send-message-to-user`, { type, content, targetId });
  }

  sendMessageToConversation(type: MessageType, content: string, conversationId: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/send-message-to-conversation`, { type, content, conversationId });
  }

  setNickName(conversationId: string, userId: string, nickName: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/set-nick-name`, { conversationId, userId, nickName });
  }

}
