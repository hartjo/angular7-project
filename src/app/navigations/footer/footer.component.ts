import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  languageregionData: any;

  constructor(private languageService: LanguageService) {
    this.languageregionData = this.languageService.languageRegiondata;
    this.languageService.configObservable.subscribe(value => {
      this.languageregionData = value;
      setTimeout(function () {

      });
    });
  }

  ngOnInit() {
  }

}
