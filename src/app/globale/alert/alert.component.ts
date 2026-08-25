import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GlobaleService } from '../globale.service';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  constructor(public GlobaleS:GlobaleService,private AlertS:AlertService){}
  public isopen=()=>{return this.AlertS.isOpen()}
  fermer(){
    this.GlobaleS.fermerAlert()
    this.AlertS.hide()
  }
}
