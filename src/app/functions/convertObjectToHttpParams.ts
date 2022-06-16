import { HttpParams } from '@angular/common/http';

export function ConvertObjectToHttpParams(obj:any) {
  var params = new HttpParams();
  if(!!obj){
    Object.keys(obj).forEach(key => {
      params = params.set(key,!!obj[key]?obj[key]:"");
    });
    return params;
  }
  return params;
}
