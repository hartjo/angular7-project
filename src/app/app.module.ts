import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigations/header/header.component';
import { ApploadService } from './services/app/appload.service';
import { ServerErrorComponent } from './views/server-error/server-error.component';
import { AppInterceptorService } from './services/api/app-interceptor.service';
import { FooterComponent } from './navigations/footer/footer.component';
import { HomeComponent } from './views/home/home.component';
import { SlickModule } from 'ngx-slick';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './animations/loader/loader.component';
import { BreadcrumbsComponent } from './navigations/breadcrumbs/breadcrumbs.component';
import { CreateAccountComponent } from './views/user/create-account/create-account.component';
import { CachingInterceptor } from './services/api/app-cache.service';
import { RequestCacheWithMap } from './services/api/request-cache.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

export function init_app(appLoadService: ApploadService) {
  return () => appLoadService.initializeApp();
}

export function get_Languages(appLoadService: ApploadService) {
  return () => appLoadService.getLanguages();
}

export function tokenGetter() {
  return localStorage.getItem('jwttoken') === '' || localStorage.getItem('jwttoken') === null ?
  'xxx' : localStorage.getItem('jwttoken');
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ServerErrorComponent,
    FooterComponent,
    HomeComponent,
    LoaderComponent,
    BreadcrumbsComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SlickModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
    NgbTooltipModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ApploadService,
    Title,
    RequestCacheWithMap,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [ApploadService], multi: true },
    { provide: APP_INITIALIZER, useFactory: get_Languages, deps: [ApploadService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
