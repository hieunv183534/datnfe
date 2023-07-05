import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessageType } from '../model/enum';
import { AddConversationDto, GetListConversationDto, GetListMessageDto, MessageSendToConversationDto, MessageSendToUserDto } from '../model/chat.class';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {

  constructor(private _router: Router, private _messageService: MessageService) {
    super(_router, _messageService);
    this.apiController = 'fsi/chat';
  }

  addUserToConversation(userId: string, conversationId: string){
    return this.BaseAPIConfig.post(`${this.apiController}/user-to-conversation?userId=${userId}&conversationId=${conversationId}`, {});
  }

  addConversation(input: AddConversationDto){
    return this.BaseAPIConfig.post(`${this.apiController}/conversation`, input);
  }

  getListConversation(input: GetListConversationDto){
    return this.BaseAPIConfig.post(`${this.apiController}/to-get-list-conversation`, input);
  }

  getListMessageByConversation(input: GetListMessageDto){
    return this.BaseAPIConfig.post(`${this.apiController}/to-get-list-message-by-conversation`, input);
  }

  sendMessageToNewOther(input: MessageSendToUserDto){
    return this.BaseAPIConfig.post(`${this.apiController}/send-message-to-new-other`, input);
  }

  sendMessageToConversation(input: MessageSendToConversationDto){
    return this.BaseAPIConfig.post(`${this.apiController}/send-message-to-conversation`, input);
  }

  acceptPendingConversation(conversationId: string){
    return this.BaseAPIConfig.post(`${this.apiController}/accept-pending-conversation/${conversationId}`, {});
  }

  seenConversation(conversationId: string){
    return this.BaseAPIConfig.post(`${this.apiController}/seen-conversation/${conversationId}`, {});
  }

}
