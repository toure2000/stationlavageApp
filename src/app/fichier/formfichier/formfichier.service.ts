import { Injectable } from '@angular/core';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { FichierService } from '../fichier.service';

@Injectable({
  providedIn: 'root'
})
export class FormfichierService {
  constructor(private connService:ConnectionService,private fichierS:FichierService) { }
  type:string="PROFILE";
  urllocale!:string;
  file!:File;
   fileChange(e:Event){
    let files=(e.target as HTMLInputElement).files;
    if(files){
      this.file=files[0]
      this.urllocale=URL.createObjectURL(this.file)
    }
   }


   ngSubmit(){
     if(this.file){
        this.fichierS.savefichier(undefined,this.connService.getCurrentUser().id,this.file,this.type)
     }
   }

   ngSubmitType(type:string){
    if(this.file){
       this.fichierS.savefichier(undefined,this.connService.getCurrentUser().id,this.file,type)
    }
   }
}
