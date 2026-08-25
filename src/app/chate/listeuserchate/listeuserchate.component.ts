import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { Utilisateur } from '../../model/utilisateur';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { ChateService } from '../chate.service';

@Component({
  selector: 'app-listeuserchate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listeuserchate.component.html',
  styleUrl: './listeuserchate.component.scss'
})
export class ListeuserchateComponent {
  constructor(
    public chateS: ChateService,
    public UtilisateurS: UtilisateurService,
    public conns: ConnectionService,
    private route: Router,
    private observer: BreakpointObserver
  ) { }

  getcountNonvueOrVide(iduseristo: string, iduserEm?: string) {
    let value = this.chateS.getCountListeMessageNonVue(iduseristo, iduserEm)
    return value != 0 ? value : ""
  }
  userClickEvent(user: Utilisateur) {

    this.observer.observe(['(max-width: 400px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.route.navigateByUrl('ChateComponent')
        setTimeout(() => {
          this.chateS.setListIdTo([user.id]);
          this.chateS.setUserTo(user)
          this.chateS.setMessageUserVueByUser(user.id, this.conns.getCurrentUser().id)
        }, 200);
      } else {
        this.chateS.setListIdTo([user.id]);
        this.chateS.setUserTo(user)
        this.chateS.setMessageUserVueByUser(user.id, this.conns.getCurrentUser().id)
      }
    });

  }
  ngAfterViewInit() {
    this.UtilisateurS.getAll().subscribe(
      l => { this.chateS.setListUser(this.UtilisateurS.normaliseAllImage(l)) },
      //(e:Error)=>{this.conns.GlobaleS.alert(e.message)}
    )
  }
  ngOnInit(){
   
  }
}
