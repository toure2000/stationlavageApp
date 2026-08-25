import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { MessageObject } from '../../model/websocket/message-object';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { ChateService } from '../chate.service';

@Component({
  selector: 'app-listchate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listchate.component.html',
  styleUrl: './listchate.component.scss'
})
export class ListchateComponent {
  constructor(
    public chateS: ChateService,
    public UtilisateurS: UtilisateurService,
    public conns: ConnectionService,
    private route: Router) { }

    getClasse(a: MessageObject): string {
      if (a.iduser == this.chateS.getIduser()) {
        return "message parker"
      } else {
        return "message stark"
      }
    }
    @ViewChild('divchat') divchat!: ElementRef;

}
