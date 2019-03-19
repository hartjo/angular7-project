import { Component, OnInit, HostListener, ElementRef, ViewEncapsulation } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { LanguageService } from '../../services/language/language.service';
import { SessionService } from '../../services/session/session.service';
import { trigger, transition, animate, style } from '@angular/animations';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  categories: Array<any>;
  regions: Array<any> = [];
  languages: Array<any> = [];
  formRegion: {regionCode: 0, languageCode: 'en-NA'};
  formLogin: {username: null, password: null};
  subccategories: Array<any>;
  hover: Boolean = false;
  activeIndex = 0;
  languageregionData: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  showBackdrop = false;
  myVar: any;

  constructor(private navService: NavigationService, private languageService: LanguageService,
    private session: SessionService, private eRef: ElementRef) {

    this.formRegion =  {regionCode: 0, languageCode: 'en-NA'};
    this.formLogin = {username: null, password: null};
    this.languageregionData = this.languageService.languageRegiondata;
    this.languageService.configObservable.subscribe(value => {
      this.languageregionData = value;
      this.getCategories();
      setTimeout(function () {

        if ($('.main-nav').width() - $('.navbar-nav').width() < 210) {
          $('.nav-item').css('font-size', '.9rem');
        }
      });
    });

    $(document).on('click', '.dropdown-setting-langauage', function (e) {
      if ($('.dropdown-setting-langauage-menu').is(':visible')) {
        $('.dropdown-setting-langauage-menu').css('display', 'none');
      } else {
        $('.dropdown-setting-langauage-menu').css('display', 'block');
      }
    });

    $(document).on('click', '.user-mobile', function (e) {
      if ($('.dropdown-user-login-menu').is(':visible')) {
        $('.dropdown-user-login-menu').css('display', 'none');
      } else {
        $('.dropdown-user-login-menu').css('display', 'block');
      }
    });

    $(document).on('click', 'body', function(e) {
      if ($(e.target).hasClass('dropdown-setting-langauage')) {
        $('.dropdown-user-login-menu').css('display', 'none');
        return false;
      }

      if ($(e.target).hasClass('user-mobile')) {
        $('.dropdown-setting-langauage-menu').css('display', 'none');
        return false;
      }

      if (!$('.dropdown-setting-langauage-menu').is(e.target)
        && $('.dropdown-setting-langauage-menu').has(e.target).length === 0
        ) {
          $('.dropdown-setting-langauage-menu').css('display', 'none');
      }

      if (!$('.dropdown-user-login-menu').is(e.target)
        && $('.dropdown-user-login-menu').has(e.target).length === 0
        ) {
          $('.dropdown-user-login-menu').css('display', 'none');
      }
    });

    this.getCategories();

    this.navService.getLanguagesandRegions().then((data: any) => {
      this.regions = data.regions;
      this.formRegion.regionCode = data.value.id;
      this.formRegion.languageCode = data.value.languages;
      this.regionChange(this.formRegion.regionCode);
    });
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  onMouseover(i) {
    this.hover = true;
    this.subccategories = this.categories[i].subCategories;
    this.activeIndex = i;
  }

  initSubitems() {
    if (this.categories.length > 0) {
      this.subccategories = this.categories[0].subCategories;
    }
  }

  regionChange(id) {
    const region: Array<any> = Array.from(this.regions).filter((item: any) => item.id === id);
    this.languages = region[0].languages;
  }

  updateLanguage(form) {
    if (form.invalid === true){
      return;
    }

    this.languageService.setLanguageRegion(form.value);
    $('.dropdown-setting-langauage-menu').css('display', 'none');
  }

  private getCategories() {
    this.navService.getCategories().then((data: any) => {
      for (let i = 0, len = data.length; i < len; i++) {
        data[i].hover = false;
      }

      this.categories = data;
      this.subccategories = this.categories[0].subCategories;
      this.hover = true;
    });
  }

  private login() {
    // $('#login').button('loading');
    const payload = {
      username: this.formLogin.username,
      password: this.formLogin.password,
      oldToken: localStorage.getItem('token'),
      timezoneOffset: -480,
    };

    this.navService.login(payload).then((data: any) => {
      this.session.createSession(data);
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    });
  }

  private logout() {
    this.session.destroySession().then((data: any) => {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    });
  }

  closeBackDrop() {
    this.myVar = setTimeout(() => {
      this.showBackdrop = false;
    }, 600);
  }

  openBackDrop() {
    clearTimeout(this.myVar);
    setTimeout(() => {
      this.showBackdrop = true;
    }, 100);
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
    } else {
      this.closeBackDrop();
    }
  }

}
