import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessageReact, MessageType } from '../model/enum';
import { AddConversationDto, GetListConversationDto, GetListMessageDto, MessageSendToConversationDto, MessageSendToUserDto, PinMessageDto, ReactMessageDto } from '../model/chat.class';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {

  constructor(private _router: Router, private _messageService: MessageService) {
    super(_router, _messageService);
    this.apiController = 'fsi/chat';
  }

  addUserToConversation(userId: string, conversationId: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/user-to-conversation?userId=${userId}&conversationId=${conversationId}`, {});
  }

  removeUserFromConversation(userId: string, conversationId: string) {
    return this.BaseAPIConfig.delete(`${this.apiController}/user-from-conversation?userId=${userId}&conversationId=${conversationId}`);
  }

  addConversation(conversationName: string, memberIds: string[], avatarUrl?: string, avatarFile?: any) {
    let formData = new FormData();
    formData.append("file", avatarFile);
    formData.append("ConversationName", conversationName ?? "");
    formData.append("AvatarUrl", avatarUrl ?? "");
    formData.append("MemberIds", JSON.stringify(memberIds) ?? "[]");
    return this.BaseAPIConfig.post(`${this.apiController}/conversation`, formData);
  }

  updateConversation(conversationId: string, conversationName: string, avatarUrl?: string, avatarFile?: any) {
    let formData = new FormData();
    if (avatarFile) {
      formData.append("file", avatarFile);
    }
    formData.append("ConversationName", conversationName ?? "");
    formData.append("AvatarUrl", avatarUrl ?? "");
    formData.append("ConversationId", conversationId ?? "");
    return this.BaseAPIConfig.post(`${this.apiController}/update-conversation`, formData);
  }

  getListConversation(input: GetListConversationDto) {
    return this.BaseAPIConfig.post(`${this.apiController}/to-get-list-conversation`, input);
  }

  getListMessageByConversation(input: GetListMessageDto) {
    return this.BaseAPIConfig.post(`${this.apiController}/to-get-list-message-by-conversation`, input);
  }

  sendMessageToNewOther(input: MessageSendToUserDto) {
    return this.BaseAPIConfig.post(`${this.apiController}/send-message-to-new-other`, input);
  }

  sendMessageToConversation(input: MessageSendToConversationDto) {
    return this.BaseAPIConfig.post(`${this.apiController}/send-message-to-conversation`, input);
  }

  acceptPendingConversation(conversationId: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/accept-pending-conversation/${conversationId}`, {});
  }

  seenConversation(conversationId: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/seen-conversation/${conversationId}`, {});
  }

  getConversationByUserId(userId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/conversation-by-user-id/${userId}`);
  }

  getUsersByConversation(conversationId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/users-by-conversation/${conversationId}`);
  }

  test() {
    return this.BaseAPIConfig.post(`${this.apiController}/test-signal-r`, {});
  }

  reactMessage(input: ReactMessageDto){
    return this.BaseAPIConfig.post(`${this.apiController}/react-message`, input);
  }

  pinMessage(input: PinMessageDto){
    return this.BaseAPIConfig.post(`${this.apiController}/pin-message`, input);
  }

  getListPinMessageByConversation(conversationId: string){
    return this.BaseAPIConfig.get(`${this.apiController}/pin-message-by-conversation/${conversationId}`);
  }
}
