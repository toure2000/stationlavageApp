import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { ConfirmationDialogueComponent } from './confirmation-dialogue/confirmation-dialogue.component';
import { GlobaleService } from './globale.service';
import { ProgresseComponent } from './progresse/progresse.component';
@Component({
  selector: 'app-globale',
  standalone: true,
  imports: [CommonModule,ProgresseComponent,ConfirmationDialogueComponent,AlertComponent,ProgresseComponent],
  templateUrl: './globale.component.html',
  styleUrl: './globale.component.scss'
})
export class GlobaleComponent {
  constructor(public GlobaleS:GlobaleService){}
}



