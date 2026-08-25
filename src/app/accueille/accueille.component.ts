import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../authentification/connection/connection.service';
import { AccueilleadminComponent } from './accueilleadmin/accueilleadmin.component';
import { AccueilleclientComponent } from './accueilleclient/accueilleclient.component';
import { AccueilleouvrierComponent } from './accueilleouvrier/accueilleouvrier.component';

@Component({
  selector: 'app-accueille',
  standalone: true,
  imports: [AccueilleadminComponent,AccueilleclientComponent,AccueilleouvrierComponent],
  templateUrl: './accueille.component.html',
  styleUrl: './accueille.component.scss'
})
export class AccueilleComponent {
  constructor(public route:Router,public conns:ConnectionService){}

}
