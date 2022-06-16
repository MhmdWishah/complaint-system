import { skip, switchMap, throttleTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from './../../../_metronic/layout/core/layout.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, FormGroup } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { PrimeNGConfig } from 'primeng/api';
import { ConfigurationService } from './configurations.service';



type Tabs = 'Header' | 'Toolbar' | 'PageTitle' | 'Aside' | 'Content' | 'Footer' | 'Footer1' | 'Footer2' | 'Footer3' | 'Footer4';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {
  activeTab: Tabs = 'Header';
  model: any;
  @ViewChild('form', { static: true }) form: NgForm;
  configLoading: boolean = false;
  resetLoading: boolean = false;
  Codes$: Observable<any>;
  dataTime = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  pesantAge=[10,20,30,40,50,60,70,80,90];
  resSave: any;
  constructor(
    private layout: LayoutService,
    private primengConfig: PrimeNGConfig,
     private service: ConfigurationService,
     private toastr: ToastrService) { }
  ConfigurationsForm = new FormGroup({
    //الإعدادات العامة
    LanguageCode: new FormControl(),
    CurrencyId: new FormControl(),
    FisalYear: new FormControl(),
    WeekStartDay: new FormControl(),

    //اعدادات الأمان
    AutoUsersLogout: new FormControl(),
    AutoPasswordExpiration: new FormControl(),
    AutoPasswordExpirationNotification: new FormControl(),


    // اعدادات واجهة المستخدم
    AssetPickingShow: new FormControl(),
    AssetPickingOrder: new FormControl(),
    AssetManagingShow: new FormControl(),

    // إعدادات المهام العامة
    WOLogTimeDescription: new FormControl(),
    WOCompletionNote: new FormControl(),
    WOPartPricePrinting: new FormControl(),
    WOExternalCommentNotification: new FormControl(),

    // إعدادات طلب العمل
    WRCaptchaStatus: new FormControl(),
    WRRequesterViewScope: new FormControl(),

    // غير محدد
    PartConsumtionMethod: new FormControl(),
    WOLogTimeMethod: new FormControl(),
    WRSimiliarityRatio: new FormControl(),
    InsertionTemplate: new FormControl(),

    LongTaskRatio : new FormControl(0),
    WODefaultTemplate:new FormControl(0),
    WODefaultDueDate :new FormControl(0),



  });
  ngOnInit(): void {


    this.model = this.layout.getConfig();
    this.primengConfig.ripple = true;
    this.getCodeConfigurationAndDataConfiguration();

    const SaveConfig$ =
      this.ConfigurationsForm.valueChanges.pipe( skip(1),switchMap((data: any) => {
        if(this.ConfigurationsForm.get('AutoPasswordExpiration')?.value==0){
          return this.service.saveConfiguration({...data,AutoPasswordExpirationNotification:0})
        }else{
            return this.service.saveConfiguration({...data})
}
      }))
    SaveConfig$.subscribe(res => {
      this.resSave = res;
      if (this.resSave.rv > 0) {
        this.toastr.success(this.resSave.Msg);
      } else {
        this.toastr.error(this.resSave.Msg);

      }
    })


  }

  setActiveTab(tab: Tabs) {
    this.activeTab = tab;
  }

  resetPreview(): void {
    this.resetLoading = true;
    this.layout.refreshConfigToDefault();
  }

  submitPreview(): void {
    this.configLoading = true;
    this.layout.setConfig(this.model);
    location.reload();
  }

  getCodeConfigurationAndDataConfiguration() {
    this.Codes$ = this.service.getCodeConfiguration();
    this.service.getCodeConfiguration().subscribe(data => {
      console.log("data", data);
      this.service.getConfiguration().subscribe(dataForm => {
        this.ConfigurationsForm.patchValue({
          ...dataForm,
          FisalYear: new Date(dataForm.FisalYear)
        })
        console.log("dataForm", dataForm);
      })

    })
  }

}
