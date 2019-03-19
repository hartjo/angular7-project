import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppService } from '../api/app.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends AppService {

  sessionChange = new Subject<any>();

  constructor(http: HttpClient, private jwthelper: JwtHelperService) {
    super(http);
  }

  emitsessionChange(val) {
    this.sessionChange.next(val);
  }

  createSession(data) {

    localStorage.setItem('token', data.data.token);
    localStorage.setItem('jwttoken', data.data.jwttoken);
    localStorage.setItem('currentUser', JSON.stringify(data.data));
    this.emitsessionChange(true);
    return null;
  }

  destroySession(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.init().subscribe((data: any) => {
        this.createGuest(data);
        this.emitsessionChange(true);
        resolve();
      }, error => {
        // reject();
      });
    });
  }

  createGuest(data) {

    localStorage.setItem('token', data.data.token);
    localStorage.setItem('jwttoken', data.jwtToken);
    try {

      if (environment.withJwt === true) {
        const decodedToken = this.jwthelper.decodeToken(localStorage.getItem('jwttoken'));
        localStorage.setItem('currentUser', JSON.stringify({
          firstname: '',
          lastname: '',
          userId: decodedToken.payload == null ||  decodedToken.payload === undefined ? 'GUEST' : decodedToken.payload,
          bidderid: '',
          jwttoken: data.jwtToken,
          token: data.data.token
        }));
      } else {
        localStorage.setItem('currentUser', JSON.stringify({
          firstname: '',
          lastname: '',
          userId: 'GUEST',
          masterFilter: {value:{id: 0}},
          bidderid: '',
          jwttoken: data.jwtToken,
          token: data.data.token
        }));
      }

      this.emitsessionChange(true);
    } catch (error) {

    } finally {

    }
    return null;
  }

}
