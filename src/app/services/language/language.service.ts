import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from '../api/app.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends AppService {

  configObservable = new Subject<any>();
  languageRegiondata: Array<any>;
  private languageRegionUrl = '/region/languages';
  private translationUrl = '/translate';
  languageCode = localStorage.getItem('languageCode');

  emitConfig(val) {
    this.configObservable.next(val);
  }

  setLanguageRegion(params) {

    this.postWithTokenandUrlParams(this.languageRegionUrl, this.version1, params).subscribe((data: any) => {
      this.languageCode = params.languageCode;
      localStorage.setItem('languageCode', params.languageCode);
      this.getTranslations().then((result: any) => {

      });
    }, error => {
      // error;
    });
  }

  getTranslations(): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        section: 'homepage',
        // currentTime: this.getCurrentTime(),
        languageCode: this.getLanguage()
      };

      this.getWithToken(this.translationUrl, this.version1, params).subscribe((data: any) => {
        this.languageRegiondata = data.data;
        this.emitConfig(this.languageRegiondata);
        resolve(this.languageRegiondata);
      }, error => {
        // error;
      });
    });
  }

  getLanguage() {
    return this.languageCode;
  }


}
