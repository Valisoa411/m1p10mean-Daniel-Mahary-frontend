import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { clientRoutes } from './routes/clientRoutes';

import { SignUpComponent } from './client/sign-up/sign-up.component';
import { LinksListComponent } from './util/links-list/links-list.component';
import { ManagerLoginComponent } from './manager/manager-login/manager-login.component';
import { managerRoutes } from './routes/managerRoutes';
import { ServiceComponent } from './service/service.component';
import { ServiceFormComponent } from './service/service-form/service-form.component';

const routes: Routes = [
  { path: '', component: LinksListComponent },

  ...clientRoutes,
  ...managerRoutes,

];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LinksListComponent,
    ManagerLoginComponent,
    ServiceComponent,
    ServiceFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Ajoutez le module de routage à la liste des imports
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
