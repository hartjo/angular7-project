import { Injectable } from '@angular/core';
import { AppService } from 'src/app/services/api/app.service';
import { environment } from '../../../environments/environment';

export interface SubCategory {
  id: number;
  name: string;
  parentName: string;
  count: number;
  bidlistCount: number;
  auctionCount: number;
  parentId: number;
  futureBidList: boolean;
  futureAuctions: boolean;
  wonOffers: boolean;
  childList: string;
  categoryUrl: string;
  parentCategoryUrl: string;
  parentCategorySeoUrl: string;
  subCategories?: any;
}

export interface RootObject {
  id: number;
  name: string;
  parentName?: any;
  count: number;
  bidlistCount: number;
  auctionCount: number;
  parentId: number;
  futureBidList: boolean;
  futureAuctions: boolean;
  wonOffers: boolean;
  childList: string;
  categoryUrl: string;
  parentCategoryUrl?: any;
  parentCategorySeoUrl: string;
  subCategories: SubCategory[];
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService extends AppService {

  public categories: Array<RootObject>;
  private categoryUrl = '/categories';

  private languageUrl = '/region/languages';
  private loginUrl = '/login';

  getCategories(): Promise<any> {
    return new Promise((resolve, reject) => {

      this.getWithToken(this.categoryUrl, this.version1).subscribe((data: any) => {
        resolve(data.data);
      }, error => {
        // error;
      });

    });
  }

  getLanguagesandRegions(): Promise<any> {
    return new Promise((resolve, reject) => {

      this.getWithToken(this.languageUrl, this.version1).subscribe((data: any) => {
        resolve(data.data);
      }, error => {
        // error;
      });

    });
  }

  login(params): Promise<any> {
    return new Promise((resolve, reject) => {
      let loginversion = 'v1';
      if (environment.withJwt === false) {
        loginversion = '';
      } else {
        loginversion = 'v2';
      }

      this.post(this.loginUrl, loginversion, params).subscribe((data: any) => {
        resolve(data);
      });
    });
  }

}
