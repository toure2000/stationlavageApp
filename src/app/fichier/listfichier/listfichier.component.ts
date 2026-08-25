import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { Fichier } from '../../model/Fichier';
import { ServerConfigService } from '../../server-config.service';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { FichierService } from '../fichier.service';
@Component({
  selector: 'app-listfichier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listfichier.component.html',
  styleUrl: './listfichier.component.scss'
})
export class ListfichierComponent {
   constructor(public fichierS:FichierService,private servp:ServerConfigService,public conns:ConnectionService,public UtilisateurS:UtilisateurService){}
   th:string=`
  backgroundColor: blue;
  color:#FFF
  `
  afficherFichier(url:string){
    window.open(url);
  }
  getnormalUrl(url:string){
    return url;
  }
  supperimer(id:string){
     this.fichierS.removeFichier(id)
  }
   getFichiers():Fichier[]{
    return this.fichierS.getFichiers()
   }

}
