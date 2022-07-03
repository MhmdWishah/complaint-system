import { Injectable, ChangeDetectorRef } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { NotificationsService } from './notifications.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: "root" })
export class SignalRService {
  private readonly baseUrl: string = environment.baseUrlWithoutApi;
  private hubConnection: HubConnection;
  private audio: any;
  private lenght: number;
  private lastNotificationRecord: any;


  constructor(private notificationsService: NotificationsService) {
    this.createConnection();
    this.audio = new Audio('../../../../../assets/sounds/tweet.mp3');
    
  }

   createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.baseUrl+'/Notification')
      .configureLogging(LogLevel.Debug)
      .build();
    this.startConnection();
  }

  private register(): void {
    this.hubConnection.on('Notification', (param: string) => {
      this.notificationsService.SearchNotifications(true);
      this.notificationsService.Notifications$.subscribe(value => {
        if(value.length > 0){
          if(value[0].id != this.lastNotificationRecord?.id! && !value[0].is_read && value[0].fromSignalR){
            this.audio.play();
          }
          this.lastNotificationRecord = value[0];
        }
      });
    });
  }

  private startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started.');
        this.register();
      })
      .catch(err => {
        console.log('Opps!');
        console.log(err);
      });
  }
}