import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ClientApi } from 'src/app/api/client.api';
import { Notification } from 'src/app/model/notification.model';

@Component({
  selector: 'app-client-navbar',
  templateUrl: './client-navbar.component.html',
  styleUrls: ['./client-navbar.component.css']
})
export class ClientNavbarComponent{
  notifications: Notification[] = [];
  thereIsUnchecked: boolean = false;

  constructor(
    private clientApi: ClientApi,
    private router: Router,
  ) {
    this.loadNotifications();
  }

  test() {
    console.log("test: ", this.notifications);
  }

  checkNotification(index: number){
    const notificationsTmp = [...this.notifications];
    const current = notificationsTmp[index];
    if(current._id){
      this.clientApi.checkNotification(current._id).subscribe((data) => {
        notificationsTmp[index].checked = true;
        this.notifications = notificationsTmp;
        this.thereIsUnchecked =  this.notifications.some(notification => !notification.checked);
      })
    }
  }

  loadNotifications(){
    this.clientApi.getNotifications().subscribe(data => {
      this.notifications = data.notifications;
      this.thereIsUnchecked =  this.notifications.some(notification => !notification.checked);
    })
  }
}
