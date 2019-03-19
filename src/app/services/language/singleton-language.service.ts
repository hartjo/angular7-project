import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingletonLanguageService {

  languageObservable = new Subject<any>();

  emitLanguage(val) {
    console.log(val, 'xxx');
    this.languageObservable.next(val);
  }

  constructor() { }

  setLanguage(lang) {
    this.emitLanguage(lang);
  }
}
