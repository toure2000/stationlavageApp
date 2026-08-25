import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../../authentification/connection/connection.service';

@Component({
  selector: 'app-accueilleouvrier',
  standalone: true,
  imports: [],
  templateUrl: './accueilleouvrier.component.html',
  styleUrl: './accueilleouvrier.component.scss'
})
export class AccueilleouvrierComponent {
  constructor(public route:Router,public conns:ConnectionService){}

}
