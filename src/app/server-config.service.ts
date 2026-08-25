import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerConfigService {
   private url="https://ibrahima-mamadisory2000-dev.apps.rm1.0a51.p1.openshiftapps.com/"
  //private url="https://toure.pagekite.me/"
  getUrl(){
    return this.url;
  }
  constructor() { }

}
