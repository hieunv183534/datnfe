import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AgoraService extends BaseService {

  constructor(private _router: Router, private _messageService: MessageService) {
    super(_router, _messageService);
    this.apiController = 'fsi/agora';
  }

  getRtcToken(chanelName: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/rtc-token`, { channelName: chanelName });
  }

}
