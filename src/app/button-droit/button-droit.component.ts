import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../authentification/connection/connection.service';
import { ChateService } from '../chate/chate.service';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
@Component({
  selector: 'app-button-droit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-droit.component.html',
  styleUrl: './button-droit.component.scss'
})
export class ButtonDroitComponent {
  constructor(public route:Router,public conns:ConnectionService,private UtilisateurS:UtilisateurService,private chateS:ChateService){}
  @ViewChild('probutton')
  probutton!:ElementRef;
  @ViewChild('appchatebutton')
  appchatebutton!:ElementRef;
  @ViewChild('profeatures')
  profeatures!:ElementRef;
  probuttononclick(){
    let divprofeatures=this.profeatures.nativeElement as HTMLElement
    divprofeatures.classList.toggle('active2');

  }
  chatebuttononclick(){
    this.chateS.toggle()
    if(!(this.conns.getCurrentUser()&&this.conns.getCurrentUser().id)){
      this.chateS.setListUser([])
    }
    this.UtilisateurS.getAll().subscribe(
      l=>{this.chateS.setListUser(this.UtilisateurS.normaliseAllImage(l))},
      //(e:Error)=>{this.conns.GlobaleS.alert(e.message)}
    )
    this.probuttononclick()
  }
  ngAfterViewInit(){

  }
  ngOnInit(){

  }
}
