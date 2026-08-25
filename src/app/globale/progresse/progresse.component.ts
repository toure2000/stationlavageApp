import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GlobaleService } from '../globale.service';
import { ProgresseService } from './progresse.service';

@Component({
  selector: 'app-progresse',
  standalone: true,
  imports: [CommonModule,MatProgressSpinnerModule],
  templateUrl: './progresse.component.html',
  styleUrl: './progresse.component.scss'
})
export class ProgresseComponent {
  constructor(public GlobaleS:GlobaleService,private ProgresseS:ProgresseService){}
  public isopen=()=>{return this.ProgresseS.isOpen()}
  fermer(){
    this.GlobaleS.fermerAlert()
    this.ProgresseS.hide()
  }
}
