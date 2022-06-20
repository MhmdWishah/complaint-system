import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { NotificationsService } from '../../../../services/notifications.service';
import { SignalRService } from '../../../../services/signalr.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';
  unreadNotificationsNumber$: Observable<number>;

  constructor(
    private layout: LayoutService, 
    private notifyService: NotificationsService,
     signalRService:SignalRService,) {
    notifyService.SearchNotifications();
  }

  ngOnInit(): void {
    this.headerLeft = this.layout.getProp('header.left') as string;
    this.unreadNotificationsNumber$ = this.notifyService.UnreadNotificationsNumber$; 
  }

  openNotifications(){
    this.notifyService.SearchNotifications();
  }
}
