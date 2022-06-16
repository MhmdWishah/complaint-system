import { tap } from 'rxjs/operators';
// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';
// Object path
import * as objectPath from 'object-path';
// Services
import { MenuConfigService } from './menu-config.service';

@Injectable({providedIn:'root'})
export class MenuService {
  // Public properties
  menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  /**
   * Service constructor
   *
   * @param menuConfigService: MenuConfigService
   */
  constructor(private menuConfigService: MenuConfigService) {
    this.loadMenu();
  }

  /**
   * Load menu list
   */
  loadMenu() {
    // get menu list
    this.menuConfigService.getOnUpdateMenu().pipe(tap((menu) => {
      const menuItems: any[] = objectPath.get(menu, 'header.items');
      this.menuList$.next(menuItems);
    })).subscribe();

  }
}
