import { Injectable } from '@angular/core';
import { AppService } from 'src/app/services/api/app.service';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from 'src/app/services/language/language.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends AppService {

  gridlistUrl = '/listings';
  gridList;

  constructor(http: HttpClient, private language: LanguageService) {
    super(http);
  }

  getGridlist(): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        listingType: 'featured',
        itemsPerRow: 12,
        page: 1,
        sortOrder: '',
        sortBy: '',
        masterFilter: JSON.parse(localStorage.getItem('currentUser')) === null ?
        0 : JSON.parse(localStorage.getItem('currentUser')).masterFilter.value.id,
        // currentTime: this.getCurrentTime(),
        languageCode: this.language.getLanguage()
      };

      this.gridList = this.getWithToken(this.gridlistUrl, this.version1, params).subscribe((data: any) => {
        resolve(data);
      });
    });
  }

  unSubs() {
    this.gridList.unsubscribe();
  }
}
