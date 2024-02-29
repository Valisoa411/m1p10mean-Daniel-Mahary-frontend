import { Routes } from '@angular/router'
import { SignUpComponent } from '../client/sign-up/sign-up.component'
import { InscriptionloadComponent } from '../client/inscriptionload/inscriptionload.component'
import { AccueilComponent } from '../client/accueil/accueil.component'
import { LoginComponent } from '../client/login/login.component'
import { RendezVousComponent } from '../client/rendez-vous/rendez-vous.component';
import { WaitingPageComponent } from '../client/waiting-page/waiting-page.component';
import { ClientListEmployeComponent } from '../client/client-list-employe/client-list-employe.component';

export const clientRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'client', component: LoginComponent },
  { path: 'client/signin', component: LoginComponent },
  { path: 'client/validation/:id', component: InscriptionloadComponent },
  { path: 'client/accueil', component: AccueilComponent },
  { path: 'client/employe', component: ClientListEmployeComponent },

  { path: 'client/signup', component: SignUpComponent },
  { path: 'client/rendezvous/:idService', component: RendezVousComponent },
  { path: 'client/waiting', component: WaitingPageComponent },
]
