import { Component } from '@angular/core';
import { ManagerApi } from 'src/app/api/manager.api';
import { TokenService } from 'src/app/client/service/token.service';
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
    private tokenService: TokenService,
  ) { }

  loginManager(): void {
    this.managerApi.loginManager(this.manager).subscribe({
      next: (data) => {
        if (data.token) {
          this.tokenService.setToken(data.token)
          this.succes = true;
          this.message = data.message;
        } else {
          this.succes = false;
          this.message = data.message;
        }
      },
      error: (error) => {
        this.succes = false;
        this.message = error.error.message;
      }
    })
  }
}
