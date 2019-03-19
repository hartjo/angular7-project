import { Injectable } from '@angular/core';
import { AppService } from '../api/app.service';
import { LanguageService } from '../language/language.service';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SessionService } from '../session/session.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApploadService extends AppService {

  constructor(http: HttpClient,
    private languageService: LanguageService,
    private session: SessionService,
    private jwthelper: JwtHelperService) {
    super(http);
  }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {

      try {
        if (environment.withJwt === false) {
          this.init().subscribe((data: any) => {
            this.session.createGuest(data);
            resolve();
          }, error => {
            // reject();
            // console.log(error);
          });
        }
        const isExpired = this.jwthelper.isTokenExpired(localStorage.getItem('jwttoken'));

        if (isExpired) {
          this.init().subscribe((data: any) => {
            this.session.createGuest(data);
            resolve();
          }, error => {
            // reject();
            // console.log(error);
          });
        } else {
          resolve();
        }
      } catch (error) {
        this.init().subscribe((data: any) => {
          this.session.createGuest(data);
          resolve();
        }, error => {
          // reject();
          // console.log(error);
        });

      } finally {

      }
    });
  }

  getLanguages(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {

        if (environment.withJwt === false) {
          this.init().subscribe((data: any) => {
            this.session.createGuest(data);
            this.languageService.getTranslations().then((data2: any) => {
              this.languageService.emitConfig(data2);
              resolve();
            });
          }, error => {
            // reject();
            // console.log(error);
          });
        }

        const isExpired = this.jwthelper.isTokenExpired(localStorage.getItem('jwttoken'));

        if (isExpired) {

          this.init().subscribe((data: any) => {
            this.session.createGuest(data);
            this.languageService.getTranslations().then((data2: any) => {
              this.languageService.emitConfig(data2);
              resolve();
            });
          }, error => {
            // reject();
            // console.log(error);
          });

        } else {
          this.languageService.getTranslations().then((data2: any) => {
            this.languageService.emitConfig(data2);
            resolve();
          });
        }

      } catch (error) {

        this.init().subscribe((data: any) => {
          this.session.createGuest(data);
          this.languageService.getTranslations().then((data2: any) => {
            this.languageService.emitConfig(data2);
            resolve();
          });
        }, error => {
          // reject();
          // console.log(error);
        });

      }
    });
  }
}
