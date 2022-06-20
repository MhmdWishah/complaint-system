import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../modules/auth/services/http.service';
import { SignalRService } from './signalr.service';
import { Notification } from "../models/notifications.model";
import { Response } from "../models/common-response.model";

@Injectable({ providedIn: "root" })
export class NotificationsService {
  private readonly baseUrl: string = "/Notifications";
  private Notifications: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);
  private UnreadNotificationsNumber = new BehaviorSubject<number>(0);

  constructor(private http: HttpService, 
    // private signalR: SignalRService
    ) {
  }

  SearchNotifications() {
    const EmpID = localStorage.getItem("empID");
    this.http.getData(this.baseUrl + "?Program=Complaint", { EmpID }).pipe(
      tap((res: Notification[]) => {
        console.log("nots", res)
        // if(length != res.length) this.audio.play();
        this.Notifications.next(res);
        this.UnreadNotificationsNumber.next(res.filter(not => !not.is_read).length);
      })
    ).subscribe();
  }

  SaveAsRead(ID:number): Observable<Response|any> {
    return this.http.saveData(this.baseUrl, {ID});
  }

  get Notifications$(): Observable<Notification[]>{
    return this.Notifications.asObservable();
  }

  get UnreadNotificationsNumber$(): Observable<number>{
    return this.UnreadNotificationsNumber.asObservable();
  }
}
