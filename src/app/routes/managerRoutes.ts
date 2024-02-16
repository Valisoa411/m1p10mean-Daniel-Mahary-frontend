import { Routes } from '@angular/router'
import { ManagerLoginComponent } from '../manager/manager-login/manager-login.component';
import { ServiceComponent } from '../manager/service/service.component';

export const managerRoutes: Routes = [
  { path: 'manager/login', component: ManagerLoginComponent },
  { path: 'manager/service', component: ServiceComponent },
]
