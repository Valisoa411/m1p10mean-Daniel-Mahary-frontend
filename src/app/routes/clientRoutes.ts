import { Routes } from '@angular/router'
import { SignUpComponent } from '../client/sign-up/sign-up.component'
import { InscriptionloadComponent } from '../client/inscriptionload/inscriptionload.component'
import { AccueilComponent } from '../client/accueil/accueil.component'
import { LoginComponent } from '../client/login/login.component'
import { RendezVousComponent } from '../client/rendez-vous/rendez-vous.component';
import { ListerdvComponent } from '../client/listerdv/listerdv.component'

export const clientRoutes: Routes = [
  { path: 'client/signup', component: SignUpComponent },
  { path: 'client/validation/:id', component: InscriptionloadComponent },
  { path: 'client/accueil', component: AccueilComponent },
  { path: 'client/signin', component: LoginComponent },
  { path: 'client/rendezvous', component: RendezVousComponent },
  { path: 'client/listeRdv', component: ListerdvComponent },
]
