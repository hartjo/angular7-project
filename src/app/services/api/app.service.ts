import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  protected baseUrl = '/';
  protected apiUrl = environment.apiUrl;
  protected httpOptions = {};
  protected versionUrl = 'v1';
  protected token = '';
  private tokenVisitorUrl = '/token/visitor?timezoneOffset=-480';
  public version1 = 'v1';
  public version2 = 'v2';

  constructor(private http: HttpClient) {

  }

  generateParameters(parameters) {
    if (parameters === undefined || Object.keys(parameters).length <= 0 || parameters === null) {
      return null;
    }
    let params = new HttpParams();

    Object.keys(parameters).forEach(function(key, index){
      params = params.append(key, parameters[key]);
    });

    return params;
  }

  public init() {
    return this.http.get<Response>(this.apiUrl + '/' + this.versionUrl + this.tokenVisitorUrl + '&currentdate=' + new Date().getTime());
  }

  protected buildUrl(relativeUrl?, versionUrl?): string {
    return (
      this.apiUrl + '/' + versionUrl + '/' + localStorage.getItem('token') + relativeUrl
    );
  }

  protected buildUrlWithoutToken(relativeUrl?, versionUrl?): string {
    return (
      this.apiUrl + '/' + versionUrl + relativeUrl
    );
  }


  protected getWithToken(relativeUrl: string, versionUrl: string, params?: any): Observable<any> {
    const genParams = this.generateParameters(params);
    return this.http.get<Response>(this.buildUrl(relativeUrl, versionUrl), {params: genParams});
  }

  protected get(relativeUrl: string, versionUrl: string, params?: any): Observable<any> {
    const genParams = this.generateParameters(params);
    return this.http.get<Response>(this.buildUrl(relativeUrl), {params: genParams});
  }

  protected postWithToken(relativeUrl: string, versionUrl: string, params?: any): Observable<any> {
    const genParams = this.generateParameters(params);
    return this.http.post<Response>(this.buildUrl(relativeUrl, versionUrl), params);
  }

  protected postWithTokenandUrlParams(relativeUrl: string, versionUrl: string, params?: any): Observable<any> {
    const genParams = this.generateParameters(params);
    return this.http.post<Response>(this.buildUrl(relativeUrl, versionUrl), params, {params: genParams});
  }

  protected post(relativeUrl: string, versionUrl: string, params?: any): Observable<any> {
    const genParams = this.generateParameters(params);
    return this.http.post<Response>(this.buildUrlWithoutToken(relativeUrl, versionUrl), params);
  }

  public getCurrentTime(){
    return new Date().getTime();
  }

}
