import { Routes } from '@angular/router'
import { HoraireComponent } from '../employe/horaire/horaire.component';
import { SigninComponent } from '../employe/signin/signin.component';
import { AccueilEmployeComponent } from '../employe/accueil-employe/accueil-employe.component';
import { ProfilComponent } from '../employe/profil/profil.component';
import { ListeRdvComponent } from '../employe/liste-rdv/liste-rdv.component';
import { SuivitacheComponent } from '../employe/suivitache/suivitache.component';

export const employeRoutes: Routes = [
  { path: 'employe', component: SigninComponent },
  { path: 'employe/signin', component: SigninComponent },
  { path: 'employe/accueilEmploye', component: AccueilEmployeComponent },
  { path: 'employe/profil', component: ProfilComponent },
  { path: 'employe/listeRdv', component: ListeRdvComponent },
  { path: 'employe/suiviTache', component:SuivitacheComponent },

  { path: 'employe/horaire', component: HoraireComponent },
]
