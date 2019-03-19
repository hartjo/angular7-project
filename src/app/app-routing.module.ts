import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerErrorComponent } from './views/server-error/server-error.component';
import { HomeComponent } from './views/home/home.component';
import { CreateAccountComponent } from './views/user/create-account/create-account.component';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      pageisListing: false,
      pageType: 'static',
      breadcrumb : false,
      title: environment.appTitle + 'Home'
    }
  },
  {
    path: 'create-account',
    component: CreateAccountComponent,
    data: {
      pageisListing: false,
      pageType: 'static',
      breadcrumb : true,
      title: environment.appTitle + 'New Account'
    }
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
    data: {
      pageisListing: false,
      pageType: 'static',
      breadcrumb : false,
      title: environment.appTitle + 'Server Error'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
