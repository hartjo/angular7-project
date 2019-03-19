import { Injectable } from '@angular/core';
import { AppService } from 'src/app/services/api/app.service';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from 'src/app/services/language/language.service';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService extends AppService {

  private formModelAccountUrl = '/form/model/account';
  getForm;

  constructor(http: HttpClient, private language: LanguageService) {
    super(http);
  }

  getFormModelAccount(): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        userId: 0,
        // currentTime: this.getCurrentTime(),
        languageCode: this.language.getLanguage()
      };
      this.getForm = this.getWithToken(this.formModelAccountUrl, this.version1, params).subscribe((data: any) => {
        resolve(data);
      });
    });
  }

  unSub() {
    this.getForm.unsubscribe();
   }

}
