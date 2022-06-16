// Angular
import { Injectable } from '@angular/core';
// RxJS
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class MenuConfigService {
  // Public properties
  onConfigUpdated$: Subject<any>;
  // Private properties
  private menuConfig: any;

  /**
   * Service Constructor
   */
  constructor() {
    // register on config changed event and set default config
    this.onConfigUpdated$ = new Subject();
  }

  /**
   * Returns the menuConfig
   */
  getMenus() {
    return this.menuConfig;
  }

  getOnUpdateMenu() {
    return this.onConfigUpdated$;
  }

  /**
   * Load config
   *
   * @param config: any
   */
  loadConfigs(config: any) {
    this.menuConfig = config;
    this.onConfigUpdated$.next(this.menuConfig);
  }
}
