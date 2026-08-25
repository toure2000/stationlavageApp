import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { ServerConfigService } from '../../server-config.service';
import { FichierService } from '../fichier.service';
import { FormfichierService } from './formfichier.service';

@Component({
  selector: 'app-formfichier',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './formfichier.component.html',
  styleUrl: './formfichier.component.scss'
})
export class FormfichierComponent {
  constructor(
    public fichierS:FichierService,
    public conns:ConnectionService,
    private serverp:ServerConfigService,
    public FormfichierS:FormfichierService
  ){}

}
