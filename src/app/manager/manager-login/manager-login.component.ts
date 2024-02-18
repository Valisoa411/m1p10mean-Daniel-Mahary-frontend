import { Component } from '@angular/core';
import { ManagerApi } from 'src/app/api/manager.api';
import { Manager } from 'src/app/model/manager.model';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent {
  manager: Manager = new Manager();
  succes: boolean = false;
  message: string = "";

  constructor(
    private managerApi: ManagerApi,
  ) {}

  loginManager(): void {
    this.managerApi.loginManager(this.manager).subscribe({
      next: (data) => {
        this.succes = true;
        this.message = data.message;
      },
      error: (error) => {
        this.succes = false;
        this.message = error.error.message;
      }
    })
  }
}
