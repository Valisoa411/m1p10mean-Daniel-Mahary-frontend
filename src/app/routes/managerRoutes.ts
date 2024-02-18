import { Routes } from '@angular/router'
import { AccueilManagerComponent } from '../manager/accueil-manager/accueil-manager.component'
import { ListEmployeComponent } from '../manager/list-employe/list-employe.component'
import { CreateEmployeComponent } from '../manager/create-employe/create-employe.component'
export const managerRoutes: Routes = [
  { path: 'accueilManager', component: AccueilManagerComponent },
  { path: 'listEmploye', component: ListEmployeComponent },
  { path: 'createEmploye', component: CreateEmployeComponent },
]
