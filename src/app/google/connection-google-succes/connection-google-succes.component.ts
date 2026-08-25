import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { Message } from '../../model/message';
import { Utilisateur } from '../../model/utilisateur';
import { ServerConfigService } from '../../server-config.service';
import { UserToken } from './user-token';
@Component({
  selector: 'app-connection-google-succes',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './connection-google-succes.component.html',
  styleUrl: './connection-google-succes.component.scss'
})

export class ConnectionGoogleSuccesComponent {
  constructor(
    private http:HttpClient,
    private servp:ServerConfigService,
    private route:Router,
    private conns:ConnectionService,
    private fb:FormBuilder
  ){}
  private url0=this.servp.getUrl()+"googleauthrest" //url du server
  //authentification angular
  private usernameAngilar="admin";
  private passwordAngular="admin1";
  private headeAuthentificationAngular=this.setBasicHeader(this.usernameAngilar,this.passwordAngular);
  @ViewChild('formplus')
  formplus!:ElementRef

  form:FormGroup=this.fb.group(
    {
      id:[
        "",[Validators.required]
      ],
      password:[
        "",[Validators.required]
      ],
      password2:[
        "",[Validators.required]
      ]
    }
  )
  subscript(){
    if(this.form.value.password==this.form.value.password2){
      this.inscription(this.form,this.userAuthentifier);
    }else{
      window.alert("Les password ne correspondent pas !!!")
    }
  }

  inscription(form:FormGroup,usert:UserToken) {
    let user: Utilisateur = new Utilisateur()
    user.id = form.value.id
    user.nom = usert.name
    user.prenom = usert.family_name
    user.email = usert.email
    user.password = form.value.password
        this.conns.GlobaleS.initprogresse()
        this.http.post<Message>(this.servp.getUrl() + "utilisateur/save", user, { headers: this.conns.getAngularHeader() }).subscribe(
          (resul: Message) => {
            this.conns.GlobaleS.alert(resul.text);
            this.conns.GlobaleS.finprogresse()
            this.route.navigateByUrl("connection")
          },
          (e: Error) => {
            this.conns.GlobaleS.alert(e.message);
            this.conns.GlobaleS.finprogresse()
          }
        )
  }

  getLienGoogleAuth0(){
    return this.http.get<Message>(this.url0+"/getLienGoogleAuth",{headers:this.headeAuthentificationAngular});
 }
  userAuthentifier!:UserToken;
  setBasicHeader(id_email:string,password:string):HttpHeaders{
    return  new HttpHeaders().set( 'Authorization', 'Basic ' + btoa(id_email+ ':' + password) );
  }
  getLienGoogleAuth(){
    let url=this.url0+"/getUserToken"+this.route.url.substring(this.route.url.indexOf("ConnectionGoogleSuccesComponent")+"ConnectionGoogleSuccesComponent".length,this.route.url.length);
    url=url+"&operation_encoure="+sessionStorage.getItem("operation_encoure")||"";
    sessionStorage.removeItem("operation_encoure");
    return this.http.get<UserToken>(url,{headers:this.headeAuthentificationAngular});
  }
   ngOnInit(){
     if(this.route.url!="/ConnectionGoogleSuccesComponent?operation_encoure=connection"&&this.route.url!="/ConnectionGoogleSuccesComponent?operation_encoure=inscription"){
      this.getLienGoogleAuth().subscribe(
        (result:UserToken)=>{
          this.userAuthentifier=result;
          if(result.operation_encoure=="connection"){
            //action pour la connection
             if(result.token_jwt&&result.token_jwt!==""){
              this.conns.connectionAvecToken(result.email,result.token_jwt);
            }else{
              window.alert(`Personne ne dispose de compt google avec l'adresse ${result.email}\nVeillez reessayer!!!`);
              this.route.navigateByUrl("ConnectionComponent");
            }
          }else if(result.operation_encoure=="inscription"){
            //action pour l'inscription;
            if(result.token_jwt&&result.token_jwt!==""){
              window.alert("vous disposer deja d'un compte, veillez vou connecter!!");
              this.route.navigateByUrl("ConnectionComponent");
            }else{
                setTimeout(() => {
                  let form=(this.formplus.nativeElement as HTMLElement)
                  form.style.display='block'
                }, 400);
            }
          }
        },
        (e:Error)=>{window.alert(e.stack)}
       )
       }else{
        let url=this.route.url;
        let operation_encoure=url.substring(url.indexOf("?operation_encoure=")+"?operation_encoure=".length,url.length);
        if(operation_encoure&&(operation_encoure=="connection"||"inscription")){
          sessionStorage.setItem("operation_encoure",operation_encoure);
        }
        this.getLienGoogleAuth0().subscribe(
          (result:Message)=>{
            window.location.href=result.text;
          },
          (e:Error)=>{window.alert(e.stack)}
         )
       }

  }
}
