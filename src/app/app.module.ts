import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from 'primeng/dragdrop';

import { clientRoutes } from './routes/clientRoutes';
import { employeRoutes } from './routes/employeRoutes';
import { managerRoutes } from './routes/managerRoutes';

import { SignUpComponent } from './client/sign-up/sign-up.component';
import { LinksListComponent } from './util/links-list/links-list.component';
import { InscriptionloadComponent } from './client/inscriptionload/inscriptionload.component';
import { AccueilComponent } from './client/accueil/accueil.component';
import { LoginComponent } from './client/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListEmployeComponent } from './manager/list-employe/list-employe.component';
import { CreateEmployeComponent } from './manager/create-employe/create-employe.component';
import { ManagerLoginComponent } from './manager/manager-login/manager-login.component';
import { ServiceComponent } from './manager/service/service.component';
import { ServiceFormComponent } from './manager/service/service-form/service-form.component';
import { HoraireComponent } from './employe/horaire/horaire.component';
import { HoraireFormComponent } from './employe/horaire/horaire-form/horaire-form.component';
import { SigninComponent } from './employe/signin/signin.component';
import { AccueilEmployeComponent } from './employe/accueil-employe/accueil-employe.component';
import { ProfilComponent } from './employe/profil/profil.component';
import { RendezVousComponent } from './client/rendez-vous/rendez-vous.component';
import { SidebarComponent } from './manager/list-employe/sidebar/sidebar.component';
import { SettingPanelComponent } from './manager/list-employe/setting-panel/setting-panel.component';
import { FooterComponent } from './manager/list-employe/footer/footer.component';
import { ListeRdvComponent } from './employe/liste-rdv/liste-rdv.component';

const routes: Routes = [
  // { path: '/list', component: LinksListComponent },

  ...clientRoutes,
  ...managerRoutes,
  ...employeRoutes,

];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LinksListComponent,
    InscriptionloadComponent,
    AccueilComponent,
    LoginComponent,
    ListEmployeComponent,
    CreateEmployeComponent,
    ManagerLoginComponent,
    ServiceComponent,
    ServiceFormComponent,
    RendezVousComponent,
    HoraireComponent,
    HoraireFormComponent,
    SigninComponent,
    AccueilEmployeComponent,
    ProfilComponent,
    SidebarComponent,
    SettingPanelComponent,
    FooterComponent,
    ListeRdvComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Ajoutez le module de routage à la liste des imports
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
