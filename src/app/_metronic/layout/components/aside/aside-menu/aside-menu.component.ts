import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { MenuService } from '../../../core/menu.service';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;
  appPreviewChangelogUrl: string = environment.appPreviewChangelogUrl;

  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}
}
