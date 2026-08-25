import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ConnectionService } from './authentification/connection/connection.service';
import { ButtonDroitComponent } from './button-droit/button-droit.component';
import { ChateComponent } from './chate/chate.component';
import { GlobaleComponent } from './globale/globale.component';
import { TopBareComponent } from './top-bare/top-bare.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,GlobaleComponent,TopBareComponent,CommonModule,ChateComponent,ButtonDroitComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection:ChangeDetectionStrategy.Default
})
export class AppComponent {
  title = 'stationlavageApp4';
  @ViewChild('conteneur')
  conteneur!:ElementRef
  @ViewChild('topbare')
  topbare!:TopBareComponent
  constructor(public conns:ConnectionService,public route:Router){}
  focus(){
     //this.topbare.
  }
  isandroid(){
    return this.conns.ChateS.isandroid
  }
   ngAfterViewInit(){
     // window.alert("no")
        let divconteneur= this.conteneur.nativeElement as HTMLElement
        this.conns.GlobaleS.divconteneur=divconteneur;
  }
}
