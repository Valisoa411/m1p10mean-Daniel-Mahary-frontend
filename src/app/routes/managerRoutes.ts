import { Routes } from '@angular/router'
import { ListEmployeComponent } from '../manager/list-employe/list-employe.component'
import { CreateEmployeComponent } from '../manager/create-employe/create-employe.component'
import { ManagerLoginComponent } from '../manager/manager-login/manager-login.component';
import { ServiceComponent } from '../manager/service/service.component';
import { OffreSpecialComponent } from '../manager/offre-special/offre-special.component';

export const managerRoutes: Routes = [
  { path: 'manager', component: ManagerLoginComponent },
  { path: 'manager/listEmploye', component: ListEmployeComponent },
  { path: 'manager/createEmploye', component: CreateEmployeComponent },
  { path: 'manager/login', component: ManagerLoginComponent },

  { path: 'manager/service', component: ServiceComponent },
  { path: 'manager/offreSpecial', component: OffreSpecialComponent },
]
