import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../../authentification/connection/connection.service';

@Component({
  selector: 'app-accueilleadmin',
  standalone: true,
  imports: [],
  templateUrl: './accueilleadmin.component.html',
  styleUrl: './accueilleadmin.component.scss'
})
export class AccueilleadminComponent {
  constructor(public route:Router,public conns:ConnectionService){}

}
