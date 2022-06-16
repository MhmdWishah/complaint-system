import { Router } from '@angular/router';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TranslationService } from '../../../../../../modules/i18n';
import { AuthService, UserType } from '../../../../../../modules/auth';

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  language: LanguageFlag;
  user$: Observable<any>;
  langs: any[] = [];
  firstname:any
  lastname:any
  email:any
  pic:any
  private unsubscribe: Subscription[] = [];
active:any
  constructor(
    public auth: AuthService,
    private translationService: TranslationService,
    private router:Router
  ) {
    this.langs = [
      {
        lang: 'en',
        name: 'English',
        flag: './assets/media/flags/united-states.svg',
      },
      {
        lang: 'zh',
        name: 'Mandarin',
        flag: './assets/media/flags/china.svg',
      },
      {
        lang: 'es',
        name: 'Spanish',
        flag: './assets/media/flags/spain.svg',
      },
      {
        lang: 'ja',
        name: 'Japanese',
        flag: './assets/media/flags/japan.svg',
      },
      {
        lang: 'de',
        name: 'German',
        flag: './assets/media/flags/germany.svg',
      },
      {
        lang: 'fr',
        name: 'French',
        flag: './assets/media/flags/france.svg',
      },
    
      {
        lang: 'ar',
        name: 'Arabic',
        flag: './assets/media/flags/palestine.svg',
      },
    ];
  }

  ngOnInit(): void {
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.setLanguage(this.translationService.getSelectedLanguage());
    this.firstname = localStorage.getItem("fullName");
    this.email= "a.sori@gmail.com";
    this.pic= "";
    this.active=this.auth.isActive;
  }

  logout() {
    this.auth.logout();
    // document.location.reload();
  }

  selectLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.setLanguage(lang);
    document.location.reload();
  }

  setLanguage(lang: string) {
    this.langs.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  profile(){
    this.router.navigate(['settings/my-profile']);
  }
}

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}
