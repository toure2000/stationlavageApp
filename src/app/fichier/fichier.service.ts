import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectionService } from '../authentification/connection/connection.service';
import { Fichier } from '../model/Fichier';
import { Message } from '../model/message';
import { Utilisateur } from '../model/utilisateur';
import { ServerConfigService } from '../server-config.service';
@Injectable({
  providedIn: 'root'
})
export class FichierService {
  fichiers:Fichier[]=[];
  getFichiers(){
    return  this.fichiers;
  }
  constructor(private http:HttpClient,private servConf:ServerConfigService,private conns:ConnectionService) { }
  getAll(){
    return this.http.get<Fichier[]>(this.servConf.getUrl()+`fichier/getAll`,{headers:this.conns.setLocalTokenHeader()})
  }
  get(id:string){
   return this.http.get<Fichier>(this.servConf.getUrl()+`fichier/get/${id}`,{headers:this.conns.setLocalTokenHeader()})
  }
  getUserIdentity(id:string){
    return this.http.get<Fichier>(this.servConf.getUrl()+`fichier/getUserIdentity/${id}`,{headers:this.conns.setLocalTokenHeader()})
  }

  remove(id:string){
   return this.http.get<Message>(this.servConf.getUrl()+`fichier/remove/${id}`,{headers:this.conns.setLocalTokenHeader()})
  }
  removeAll(ids:string){
   return this.http.get(this.servConf.getUrl()+`fichier/removeAll/${ids}`,{headers:this.conns.setLocalTokenHeader()})
  }
  save(form:FormData){
    //console.log(form.get('id'))
   return this.http.post<Fichier>(this.servConf.getUrl()+`fichier/save`,form,{headers:this.conns.setLocalTokenHeader()})
  }
  removeFichier(id:string){
    if(window.confirm("voulez vous supprimer ce fichier ?!!".toLocaleUpperCase())){
      this.conns.GlobaleS.initprogresse()
     this.remove(id).subscribe(
      (m:Message)=>{
        this.conns.GlobaleS.alert(m.text)
        this.conns.GlobaleS.finprogresse()
        this.getAllFichier()
      },
      (e:Error)=>{
        this.conns.GlobaleS.alert("error :"+e.message)
        this.conns.GlobaleS.finprogresse()
      }
     )
    }
   }
  getAllFichier(){
    this.conns.GlobaleS.initprogresse()
    this.getAll().subscribe(
      (l:Fichier[])=>{
        this.fichiers=this.normaliseAllUrl(l);
        this.conns.GlobaleS.finprogresse()
      }
    ),
    (e:Error)=>{
      this.conns.GlobaleS.alert("error "+e.message)
      this.conns.GlobaleS.finprogresse()
    }
  }
  refreshAllFichier(){
    this.recherche()
  }
  listTypeFichier:("IDENTITY" |"VOITURE" |"TYPE_LAVAGE" | "TYPE_VOITURE" | "PROFILE"|"PASSPORT")[]
   =["IDENTITY" ,"VOITURE" ,"TYPE_LAVAGE" , "TYPE_VOITURE" , "PROFILE","PASSPORT"]

   listTypeFichierSimpleUtilisateur:("IDENTITY" |"VOITURE" |"TYPE_LAVAGE" | "TYPE_VOITURE" | "PROFILE"|"PASSPORT")[]
   =["IDENTITY" , "PROFILE","PASSPORT"]

   typeIsValide(type:string):boolean{
       return type=="IDENTITY"||type=="VOITURE"||type=="PASSPORT"||type=="TYPE_LAVAGE"||type=="TYPE_VOITURE"||type=="PROFILE"
   }

  savefichier(id:string|undefined, iduser:string,importFile:File,type:string){
    if(this.typeIsValide(type)){
     let form:FormData=this.getform(id, iduser,importFile,type)
     this.conns.GlobaleS.initprogresse()
     this.save(form).subscribe(
      (f:Fichier)=>{
          this.conns.GlobaleS.alert("succes d'enregistrement de fichier !!"+JSON.stringify(f))
          this.conns.GlobaleS.finprogresse()
          this.getAllFichier();
      },
      (e:Error)=>{
        this.conns.GlobaleS.alert("error "+e.message)
        this.conns.GlobaleS.finprogresse()
      }
     )
    }else{
      this.conns.GlobaleS.alert("invalide type !!".toLocaleUpperCase())
    }
  }

  getform(id:string|undefined, iduser:string,importFile:File,type:string){
    let form:FormData=new FormData();
    let id2=""
    if(id!=undefined&&id!="undefined"){
     id2=id
    }
    form.set("id",id2)
    form.set("iduser",iduser)
    form.set("file",importFile)
    form.set("type",type)
   if(this.typeIsValide(type)){
    return form;
   }else{
    this.conns.GlobaleS.alert("invalide type !!".toLocaleUpperCase())
    return form;
   }
 }


  hide(){
    this.hideForm()
    this.hideList()
   }
   show(){
    this.showForm()
    this.showList()
   }
   hideForm(){
    //$("#app-form-fichier").hide();
   }
   showForm(){
    //$("#app-form-fichier").show();
   }
   hideList(){
   // $("#app-list-fichier").hide();
   }
   showList(){
   // $("#app-list-fichier").show();
   }

   //script recherche

   FichierDeRecherche:Fichier=new Fichier()
   UtilisateurDeRecherche:Utilisateur=new Utilisateur()
   UtilisateurDeRechercheRole=""
   FichierDeRechercheType=""
   initFichierDeRecherche(){
    this.FichierDeRecherche=new Fichier()
    this.UtilisateurDeRecherche=new Utilisateur()
    this.UtilisateurDeRechercheRole=""
    this.FichierDeRechercheType=""
   }
   resultatrecherche:Fichier[]=[]
   getHisValue(e:Event){
    let input= e.target as HTMLInputElement
    if(input){
      return input.value
    }else{
      return ""
    }
   }
  recherche(FichierDeRecherche:Fichier=this.FichierDeRecherche,FichierDeRechercheType:string=this.FichierDeRechercheType, UtilisateurDeRecherche=this.UtilisateurDeRecherche,role:string=this.UtilisateurDeRechercheRole){
    let list0:Fichier[]=[];
     this.fichiers.forEach(
      p=>{

        let idok=!FichierDeRecherche.id||FichierDeRecherche.id==""||p.id.indexOf(FichierDeRecherche.id)==0
        let typeok=!(FichierDeRechercheType)||(FichierDeRechercheType=="")||p.type.indexOf(FichierDeRechercheType)>=0
        let urlok=!(FichierDeRecherche.url)||(FichierDeRecherche.url)==""||p.url.indexOf(FichierDeRecherche.url)>=0

        let Utilisateurtousok=true

        if(p.personne&&p.personne.id){
        let Utilisateuridok=!UtilisateurDeRecherche.id||UtilisateurDeRecherche.id==""||p.personne.id.indexOf(UtilisateurDeRecherche.id)==0
        let Utilisateurnomok=!(UtilisateurDeRecherche.nom)||(UtilisateurDeRecherche.nom)==""||p.personne.nom.indexOf(UtilisateurDeRecherche.nom)>=0
        let Utilisateurprenomok=!(UtilisateurDeRecherche.prenom)||(UtilisateurDeRecherche.prenom)==""||p.personne.prenom.indexOf(UtilisateurDeRecherche.prenom)>=0
        let Utilisateuremailok=!UtilisateurDeRecherche.email||UtilisateurDeRecherche.email==""||p.personne.email.indexOf(UtilisateurDeRecherche.email)==0
        let Utilisateurtelephoneok=!UtilisateurDeRecherche.tel||UtilisateurDeRecherche.tel==""||p.id.indexOf(UtilisateurDeRecherche.tel)==0
        let Utilisateurroleok:boolean=!role||role==""||UtilisateurDeRecherche.role==role

        Utilisateurtousok=Utilisateuridok&&Utilisateurnomok&&Utilisateuremailok&&Utilisateurprenomok&&Utilisateurtelephoneok&&Utilisateurroleok;
        }

        let tousok:boolean=idok&&typeok&&urlok;


        if(tousok&&Utilisateurtousok){
          list0.push(p)
        }
      }
     )
     return list0;
  }
  //fin script recherche


  normaliseUrl( fichier:Fichier):Fichier {
    if(fichier!=null&&fichier.url!=null) {
      let pict=fichier.url;
      if(pict.indexOf("image/")==0) {
        fichier.url=(pict.replace("image/", this.servConf.getUrl()+"image/"));
       }
       if(pict.indexOf("fichier/")==0) {
        fichier.url=(pict.replace("fichier/", this.servConf.getUrl()+"fichier/"));
       }
     }
     return fichier;
   }
   normaliseAllUrl(luser:Fichier[]):Fichier[] {
    let luser2:Fichier[]=[];
    luser.forEach(fichier=>{
      luser2.push(this.normaliseUrl(fichier));
    });
    console.log(luser2)
     return luser2;
   }
}
