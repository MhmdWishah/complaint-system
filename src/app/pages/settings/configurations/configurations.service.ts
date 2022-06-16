import { HttpService } from './../../../modules/auth/services/http.service';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ConfigurationService {
  constructor(private http: HttpService) {}

 getCodeConfiguration(){
   return this.http.getData("/Code?ScreenName=configuration")
 }

  getConfiguration() {
    return this.http.getData("/Configuration");
  }

  saveConfiguration(body: any) {
    return this.http.saveData(`/Configuration`, body);
  }
}
