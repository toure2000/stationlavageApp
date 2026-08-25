import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ChateService } from '../../chate/chate.service';
import { GlobaleService } from '../../globale/globale.service';
import { Message } from '../../model/message';
import { Utilisateur } from '../../model/utilisateur';
import { ServerConfigService } from '../../server-config.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private loginTokenName="jwt_cabinet_medical_token";
  private idAngular="angular"
  private passwordAngular="angular";
  private urlGoogleLogin="http://localhost:8080/logingoogle";
  private urlGooglesingUp="http://localhost:8080/singUpgoogle";
  constructor(private http:HttpClient,
    private server:ServerConfigService,
    private route:Router,
    public GlobaleS:GlobaleService,
    public ChateS:ChateService
  ) { }
   getIdAngular(){
    return this.idAngular;
   }
  setBasicHeader(id_email:string,password:string):HttpHeaders{
     return  new HttpHeaders().set( 'Authorization', 'Basic ' + btoa(id_email+ ':' + password) );
  }
  getAngularHeader():HttpHeaders{
    return this.setBasicHeader(this.idAngular,this.passwordAngular);
  }
  setTokenHeader(token:string):HttpHeaders{
    return new HttpHeaders().set( 'Authorization', 'Bearer ' +token);
  }

  setLocalTokenHeader():HttpHeaders{
    let token=this.getLocalTokenLogin();
    return new HttpHeaders().set( 'Authorization', 'Bearer ' +token);
  }
  getLocalTokenLogin(){
     return sessionStorage.getItem(this.loginTokenName)
  }

  saveLoginToken(token:string){
    sessionStorage.setItem(this.loginTokenName,token);
  }
  removeLoginToken(){
    sessionStorage.removeItem(this.loginTokenName)
  }


  basicLogin(id_email:string,password:string){
     return this.http.post<Message>(this.server.getUrl()+"login",null,{headers:this.setBasicHeader(id_email,password)})
  }

  tokenLogin(token:string){
    return this.http.post<Message>(this.server.getUrl()+"login",null,{headers:this.setTokenHeader(token)})
  }
  googlelogin(){
    return this.http.get<Message>(this.urlGoogleLogin,{headers:this.getAngularHeader()})
  }
  googlesingUp(){
    return this.http.get<Message>(this.urlGooglesingUp,{headers:this.getAngularHeader()})
  }
  connectionAvecGoogle(){
      this.googlelogin().subscribe(
        (p:Message)=>{
          window.location.replace(p.text)

        },
        (e:Error)=>{
          this.GlobaleS.alertBlock(e.message)
        }
      )
  }
  inscriptionAvecGoogle(){
    this.googlesingUp().subscribe(
      (p:Message)=>{
        window.location.replace(p.text)
      }
    )
}

  connectionBasic(id_email:string,password:string){
    this.GlobaleS.initprogresse()
    this.basicLogin(id_email,password).subscribe(
      (a:Message)=>{
         this.removeCurrentUser()
         this.saveLoginToken(a.text)
         console.log(a)
         this.http.get<Utilisateur>(this.server.getUrl()+`utilisateur/getByIdEmail/${id_email}`,{headers:this.setBasicHeader(id_email,password)}).subscribe(
          (u)=>{
            this.setCurrentUser(u);
            this.GlobaleS.finprogresse()
            this.route.navigateByUrl("/accueille")
            this.GlobaleS.alert("succes !!!")
            this.ChateS.getListMessageOnServer(u.id,this)
          }
        );

      },
      (e:Error)=>{
        this.GlobaleS.alertBlock(e.message)
        this.GlobaleS.finprogresse()
      }
    )
  }
  connectionAvecToken(id_email:string,jwt_token:string){
    this.GlobaleS.initprogresse()
         this.removeCurrentUser()
         this.saveLoginToken(jwt_token)
         console.log(jwt_token)
         this.http.get<Utilisateur>(this.server.getUrl()+`utilisateur/getByIdEmail/${id_email}`,{headers:this.setTokenHeader(jwt_token)}).subscribe(
          (u)=>{
            this.setCurrentUser(u);
            this.GlobaleS.finprogresse()
            this.route.navigateByUrl("accueille")
            this.GlobaleS.alert("succes !!!")
            this.ChateS.getListMessageOnServer(u.id,this)
          }
        );
  }
  deconnection(){

    this.ChateS.ws.close()
    this.ChateS.setListMessageObject([])
    this.ChateS.setUserTo(new Utilisateur())
    this.ChateS.setIduser("")


    this.GlobaleS.initprogresse()
    this.removeCurrentUser()
    this.route.navigateByUrl("/ConnectionComponent")
    this.GlobaleS.finprogresse()
  }

  setCurrentUser(u:Utilisateur){
        sessionStorage.setItem("id",u.id)
        sessionStorage.setItem("nom",u.nom)
        sessionStorage.setItem("prenom",u.prenom)
        sessionStorage.setItem("email",u.email)
        sessionStorage.setItem("role",u.role)
        sessionStorage.setItem("picture",u.picture);
        sessionStorage.setItem("role",u.role);
        sessionStorage.setItem("password",u.password);
        console.log(u);
    }
    getCurrentUser():Utilisateur{
        let u:Utilisateur=new Utilisateur();
        let s=sessionStorage.getItem("role") || '';
        if(s=="ADMIN"||s=="CLIENT"||s=="OUVRIER"){
        u.id= sessionStorage.getItem("id") || '';
        u.nom= sessionStorage.getItem("nom") || '';
        u.prenom= sessionStorage.getItem("prenom") || '';
        u.picture= sessionStorage.getItem("picture") || '';
        u.email= sessionStorage.getItem("email") || '';
        u.role = s;
        u.password= sessionStorage.getItem("password") || '';
        }
        if(u&&u.id&&u.id){
          if(!this.ChateS.isConnect()){
            this.ChateS.setIduser(u.id)
             this.ChateS.connect()
          }
        }
        return u;
    }

     removeCurrentUser(){
      sessionStorage.removeItem("id") ;
      sessionStorage.removeItem("nom") ;
      sessionStorage.removeItem("prenom") ;
      sessionStorage.removeItem("role") ;
      sessionStorage.removeItem("picture") ;
      sessionStorage.removeItem("email") ;
      sessionStorage.removeItem("role") ;
      sessionStorage.removeItem("password") ;
      this.removeLoginToken()
  }

  /*________ ROLES DE BASES   _______ */
  userisAdmin(user:Utilisateur=this.getCurrentUser()):boolean{
    return user&&user.id!=null&&user.id.length>=1&&user.role=="ADMIN"
  }
  userisClient(user:Utilisateur=this.getCurrentUser()):boolean{
    return user&&user.id!=null&&user.id.length>=1&&user.role=="CLIENT"
  }
  userisOuvrier(user:Utilisateur=this.getCurrentUser()):boolean{
    return user&&user.id!=null&&user.id.length>=1&&user.role=="OUVRIER"
  }
   /*________FIN ROLES DE BASES_______ */
    /*________ ROLES COMBINERS   _______ */
       userisClientOuOuvrier(user:Utilisateur=this.getCurrentUser()):boolean{
         return this.userisClient(user)||this.userisOuvrier(user)
       }
      userisClientOUNonConnecter(user:Utilisateur=this.getCurrentUser()):boolean{
        return !user ||!user.id ||user.id.length==0 ||this.userisClient(user)
      }
      userisOuvrierOUNonConnecter(user:Utilisateur=this.getCurrentUser()):boolean{
        return !user ||!user.id ||user.id.length==0 ||this.userisOuvrier(user)
      }
      userIsConnecter():boolean{
        return ((this.getCurrentUser()) && (this.getCurrentUser().id))?true:false
      }
     /*_______FIN _ ROLES COMBINERS   _______ */

     listRolePossible=[
      "ADMIN","CLIENT","OUVRIER"
    ]
    mapRoleUrl:any={
      "ADMIN":"AccueilleadminComponent","CLIENT":"AccueilleclientComponent",
      "OUVRIER":"AccueilleouvrierComponent"
    }
     isValideRole(s:string):boolean{
        return (typeof s)==(typeof (new Utilisateur()).role)
     }
     getAccueilleUrl(utilisateur:Utilisateur=this.getCurrentUser()):string{
        return this.mapRoleUrl[utilisateur.role]
     }

     normaliseImage( user:Utilisateur):Utilisateur {
      if(user!=null&&user.picture!=null) {
        let pict=user.picture;
        if(pict.indexOf("image/")==0) {
          user.picture=(pict.replace("image/", this.server.getUrl()+"image/"));
         }
         if(pict.indexOf("fichier/")==0) {
          user.picture=(pict.replace("fichier/", this.server.getUrl()+"fichier/"));
         }
       }
       return user;
     }
     normaliseAllImage(luser:Utilisateur[]):Utilisateur[] {
      let luser2:Utilisateur[]=[];
      luser.forEach(user=>{
        luser2.push(this.normaliseImage(user));
      });
      console.log(luser2)
       return luser2;
     }
}
