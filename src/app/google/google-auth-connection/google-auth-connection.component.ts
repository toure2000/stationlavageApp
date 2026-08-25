import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../../model/message';
import { ServerConfigService } from '../../server-config.service';

@Component({
  selector: 'app-google-auth-connection',
  standalone: true,
  imports: [],
  templateUrl: './google-auth-connection.component.html',
  styleUrl: './google-auth-connection.component.scss'
})
export class GoogleAuthConnectionComponent {
  constructor(private http:HttpClient,private servp:ServerConfigService,private route:Router){}
  private url0=this.servp.getUrl()+"googleauthrest" //url du server
  //authentification angular
  private usernameAngilar="admin";
  private passwordAngular="admin1";
  private headeAuthentificationAngular=this.setBasicHeader(this.usernameAngilar,this.passwordAngular);

  setBasicHeader(id_email:string,password:string):HttpHeaders{
    return  new HttpHeaders().set( 'Authorization', 'Basic ' + btoa(id_email+ ':' + password) );
 }
  getLienGoogleAuth(){
     return this.http.get<Message>(this.url0+"/getLienGoogleAuth",{headers:this.headeAuthentificationAngular});
  }
   ngOnInit(){
      let url=this.route.url;
      let operation_encoure=url.substring(url.indexOf("?operation_encoure=")+"?operation_encoure=".length,url.length);
      if(operation_encoure&&(operation_encoure=="connection"||"inscription")){
        sessionStorage.setItem("operation_encoure",operation_encoure);
      }
      
      this.getLienGoogleAuth().subscribe(
        (result:Message)=>{
          window.location.href=result.text;
        },
        (e:ErrorHandler)=>{window.alert(e.handleError)}
       )
   }
}
