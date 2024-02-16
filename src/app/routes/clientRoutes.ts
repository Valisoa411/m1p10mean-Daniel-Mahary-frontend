import { Routes } from '@angular/router'
import { SignUpComponent } from '../client/sign-up/sign-up.component'
import { RendezVousComponent } from '../client/rendez-vous/rendez-vous.component';

export const clientRoutes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'rendezvous', component: RendezVousComponent },
]
