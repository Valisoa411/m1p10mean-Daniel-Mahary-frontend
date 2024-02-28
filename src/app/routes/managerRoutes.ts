import { Routes } from '@angular/router'
import { ListEmployeComponent } from '../manager/list-employe/list-employe.component'
import { CreateEmployeComponent } from '../manager/create-employe/create-employe.component'
import { ManagerLoginComponent } from '../manager/manager-login/manager-login.component';
import { ServiceComponent } from '../manager/service/service.component';
import { ListerdvemployeComponent } from '../manager/listerdvemploye/listerdvemploye.component';
import { FicheEmployeComponent } from '../manager/fiche-employe/fiche-employe.component';
import { NombrereservationComponent } from '../manager/nombrereservation/nombrereservation.component';

export const managerRoutes: Routes = [
  { path: 'manager/listEmploye', component: ListEmployeComponent },
  { path: 'manager/createEmploye', component: CreateEmployeComponent },
  { path: 'manager/login', component: ManagerLoginComponent },
  { path: 'manager/service', component: ServiceComponent },
  { path: 'manager/listerdvemploye/:id', component: ListerdvemployeComponent },
  { path: 'manager/ficheemploye/:id', component: FicheEmployeComponent },
  { path: 'manager/nombrereservation', component: NombrereservationComponent }
]
