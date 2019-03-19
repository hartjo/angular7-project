import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LanguageService } from 'src/app/services/language/language.service';
import { SessionService } from 'src/app/services/session/session.service';
import { CreateAccountService } from '../services/create-account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit, OnDestroy {
  private apiUrl = environment.apiUrl;
  private languageregionData: any;
  createForm = {};
  formModel = {};

  constructor(private languageService: LanguageService, private session: SessionService, private createAccount: CreateAccountService) {
    this.languageregionData = this.languageService.languageRegiondata;
    this.languageService.configObservable.subscribe(value => {
      this.languageregionData = value;
      this.getFormModelAccount();
      setTimeout(function () {

      });
    });

    this.getFormModelAccount();
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.createAccount.unSub();
  }

  private getFormModelAccount() {
    this.createAccount.getFormModelAccount().then((data: any) => {
      data.data.searchTypes.forEach((value) => {
        const item = value;
        const char =  item.name;
        this.createForm[char] = item;
        this.formModel[char] = item.value;
      });
    });
  }

}
