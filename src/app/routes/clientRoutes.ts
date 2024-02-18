import { Routes } from '@angular/router'
import { SignUpComponent } from '../client/sign-up/sign-up.component'
import { InscriptionloadComponent } from '../client/inscriptionload/inscriptionload.component'
import { AccueilComponent } from '../client/accueil/accueil.component'
import { LoginComponent } from '../client/login/login.component'

export const clientRoutes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'validation/:id', component: InscriptionloadComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'signin', component: LoginComponent }
]
