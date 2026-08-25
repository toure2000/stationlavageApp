import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GlobaleService } from '../globale.service';
import { ConfirmationDialogueService } from './confirmation-dialogue.service';


@Component({
  selector: 'app-confirmation-dialogue',
   templateUrl: './confirmation-dialogue.component.html',
  styleUrl: './confirmation-dialogue.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class ConfirmationDialogueComponent {
  constructor(public GlobaleS:GlobaleService,private ConfirmationDialogueS:ConfirmationDialogueService){}
  public isopen=()=>{return this.ConfirmationDialogueS.isOpen()}
  fermer(){
    this.ConfirmationDialogueS.hide()
  }
}
