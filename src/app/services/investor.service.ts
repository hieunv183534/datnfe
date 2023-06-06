import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class InvestorService extends BaseService {

  constructor(private _router: Router, private _messageService: MessageService) {
    super(_router, _messageService);
    this.apiController = 'fsi/investor';
  }


  insertInvestorAsync(investorName: string, minInvestValue: number,
    maxInvestValue: number, basicDescription: string,
    investFields: string[], company: string, position: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/investor`, { investorName, minInvestValue, maxInvestValue, basicDescription, investFields, company, position });
  }

}
