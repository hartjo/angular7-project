import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  title = 'angular-eqa';
  showbreadcrumbs = false;
  loading = false;

  constructor(private route: ActivatedRoute, private router: Router, private titleService: Title) {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        const routeData = data.state.root.firstChild.data;
        this.showbreadcrumbs = routeData.breadcrumb;

        if (routeData.pageType === 'dynamic') {
          if (routeData.pageisListing === true) {
            this.setTitle(routeData.title + 'listing');
          } else {
            this.setTitle(routeData.title);
          }
          this.setTitle(routeData.title);
        } else {
          this.setTitle(routeData.title);
        }

      }
    });
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngAfterViewInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          this.loading = false;
        }
      });
  }

}
