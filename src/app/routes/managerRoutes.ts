import { Routes } from '@angular/router'
import { ListEmployeComponent } from '../manager/list-employe/list-employe.component'
import { CreateEmployeComponent } from '../manager/create-employe/create-employe.component'
import { ManagerLoginComponent } from '../manager/manager-login/manager-login.component';
import { ServiceComponent } from '../manager/service/service.component';
import { ListerdvemployeComponent } from '../manager/listerdvemploye/listerdvemploye.component';
import { FicheEmployeComponent } from '../manager/fiche-employe/fiche-employe.component';
import { NombrereservationComponent } from '../manager/nombrereservation/nombrereservation.component';
import { ChiffreaffaireComponent } from '../manager/chiffreaffaire/chiffreaffaire.component';
import { CreatedepenseComponent } from '../manager/createdepense/createdepense.component';
import { DepenseComponent } from '../manager/depense/depense.component';
import { ListedepenseComponent } from '../manager/listedepense/listedepense.component';
import { BeneficeComponent } from '../manager/benefice/benefice.component';
import { FicheComponent } from '../manager/fiche/fiche.component';
import { OffreSpecialComponent } from '../manager/offre-special/offre-special.component';

export const managerRoutes: Routes = [
  { path: 'manager', component: ManagerLoginComponent },
  { path: 'manager/listEmploye', component: ListEmployeComponent },
  { path: 'manager/createEmploye', component: CreateEmployeComponent },
  { path: 'manager/login', component: ManagerLoginComponent },

  { path: 'manager/service', component: ServiceComponent },
  { path: 'manager/listerdvemploye/:id', component: ListerdvemployeComponent },
  { path: 'manager/ficheemploye/:id', component: FicheEmployeComponent },
  { path: 'manager/fiche', component: FicheComponent },
  { path: 'manager/nombrereservation', component: NombrereservationComponent },
  { path: 'manager/chiffreaffaire', component: ChiffreaffaireComponent },
  { path: 'manager/createTypeDepense', component: CreatedepenseComponent },
  { path: 'manager/createDepense', component: DepenseComponent },
  { path: 'manager/listeDepense', component: ListedepenseComponent },
  { path: 'manager/listeBenefice', component: BeneficeComponent }
  { path: 'manager/offreSpecial', component: OffreSpecialComponent },
]
