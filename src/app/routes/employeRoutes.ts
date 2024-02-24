import { Routes } from '@angular/router'
import { HoraireComponent } from '../employe/horaire/horaire.component';
import { SigninComponent } from '../employe/signin/signin.component';
import { AccueilEmployeComponent } from '../employe/accueil-employe/accueil-employe.component';
import { ProfilComponent } from '../employe/profil/profil.component';

export const employeRoutes: Routes = [
  { path: 'employe/horaire', component: HoraireComponent },
  { path: 'employe/signin', component: SigninComponent },
  { path: 'employe/accueilEmploye', component: AccueilEmployeComponent },
  { path: 'employe/profil', component: ProfilComponent },
]
