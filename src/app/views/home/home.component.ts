import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { SessionService } from 'src/app/services/session/session.service';
import { HomeService } from './services/home.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
  private apiUrl = environment.apiUrl;
  languageregionData: any;
  gridListings: any;
  contentLoading = false;
  compileddata = [];

  slideConfig = {
    'slidesToShow': 4,
    'slidesToScroll': 4,
    'infinite': false,
    'responsive': [
      {
        breakpoint: 1260,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 930,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  constructor(private languageService: LanguageService, private session: SessionService, private homeservice: HomeService,
    private sanitizer: DomSanitizer) {
    this.languageregionData = this.languageService.languageRegiondata;
    this.languageService.configObservable.subscribe(value => {
      this.languageregionData = value;
      setTimeout(function () {

      });
    });

    this.session.sessionChange.subscribe(value => {
      this.getGridlist();
    });

  }

  ngOnInit() {
    this.getGridlist();
  }

  ngOnDestroy(): void {
    this.homeservice.unSubs();
  }

  private getGridlist() {
    this.contentLoading = true;
    this.homeservice.getGridlist().then((data: any) => {
      if (data.data !== null) {
        this.compileddata = [];
        data.data.gridRows[0].gridItems.forEach(value => {
          if (value.mainImageUrl === '') {
            value.mainImageUrl = 'assets/img/noimageavailable.png';
          }
          this.compileddata.push(value);
        });
        this.gridListings = this.compileddata;
        this.contentLoading = false;
      }
    });
  }

  addSlide() {
  }

  removeSlide() {
  }

  afterChange(e) {
  }

}
