import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../../authentification/connection/connection.service';

@Component({
  selector: 'app-accueilleclient',
  standalone: true,
  imports: [],
  templateUrl: './accueilleclient.component.html',
  styleUrl: './accueilleclient.component.scss'
})
export class AccueilleclientComponent {
  constructor(public route:Router,public conns:ConnectionService){}

}
