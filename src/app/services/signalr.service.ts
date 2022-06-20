import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { NotificationsService } from './notifications.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: "root" })
export class SignalRService {
  private readonly baseUrl: string = environment.baseUrlWithoutApi;
  private hubConnection: HubConnection;
  private audio: any;
  private lenght: number;

  constructor(private notificationsService: NotificationsService) {
    this.createConnection();
    // ../../../../../assets/sounds/tweet.mp3
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
      console.log("param:"+param);
      this.notificationsService.Notifications$.subscribe(value => {
        console.log("notificationsService.notifications$:", value)
        if(this.lenght != value.length) this.audio.play();
        this.lenght = value.length
      });
      this.notificationsService.SearchNotifications();
      // this.notificationsService.Notifications$.subscribe(value => {
      //   if(this.lenght != value.length) this.audio.play();
      // });
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