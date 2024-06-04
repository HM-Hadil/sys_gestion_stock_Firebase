import { Component } from '@angular/core';
import { NotificationService } from '../services/notifService/notification.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  constructor(private notificationService: NotificationService) {}

  showNotification(): void {
    this.notificationService.showNotification('This is a notification');
  }

  showAlert(): void {
    this.notificationService.showAlert('This is an alert');
  }
}
