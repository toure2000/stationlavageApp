import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ConnectionService } from '../authentification/connection/connection.service';

export const isconnecterGuard: CanActivateFn = (route, state) => {
  let conns=inject(ConnectionService);
  let router=inject(Router);
  if(!conns.userIsConnecter()){
    //conns.GlobaleS.alert("Authentification necessaire".toUpperCase())
    router.navigateByUrl("ConnectionComponent")
  }
  return conns.userIsConnecter();
};
