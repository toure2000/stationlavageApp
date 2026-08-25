import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../authentification/connection/connection.service';
import { Utilisateur } from '../model/utilisateur';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-top-bare',
  standalone: true,
  imports: [CommonModule,NotificationComponent],
  templateUrl: './top-bare.component.html',
  styleUrl: './top-bare.component.scss'
})
export class TopBareComponent {
  constructor(public route: Router, @Inject(DOCUMENT) private document: Document,public conns:ConnectionService) { }
  @ViewChild('sidbar') sidbar!: ElementRef
  taille: number = 200;
  sursidbar:boolean=false
  surtopbar:boolean=false

  tailleinitiale=0;
  suivantetatprofile:{'1':'0'|'1','0':'0'|'1'}={'1':'0','0':'1'}
  etatprofile:'0'|'1'='0';
  toggleprofile(){
     this.etatprofile=this.suivantetatprofile[this.etatprofile]
  }
  deconnection(){
    this.etatprofile='0'
    this.conns.deconnection()
  }
  togglesidebar() {
    let sid = this.sidbar.nativeElement as HTMLElement
    sid.style.cssText = `width:${this.taille}px`;
    this.taille = this.taille == 200 ? this.tailleinitiale : 200;
  }
  getImageUser(user: Utilisateur):string {
    let result = this.conns.GlobaleS.normaliseImage(user.picture)
      || '/assets/icones/user.png';
    return result
  }


  ngAfterViewInit(){
    let sid1 = this.sidbar.nativeElement as HTMLElement
    this.tailleinitiale=sid1.clientWidth

    this.document.body.onclick = () => {
      if(!this.sursidbar){
        let sid = this.sidbar.nativeElement as HTMLElement
        this.taille=this.tailleinitiale
        sid.style.cssText = `width:${this.taille}px`;
      }
      if(!this.surtopbar){
         this.etatprofile='0'
      }
    }

    /*setTimeout(() => {
      (this.sidbar.nativeElement as HTMLElement).click()
    }, 100);*/

  }
  ngOnInit() {

  }
}
