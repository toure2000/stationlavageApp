import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { FichierService } from '../../fichier/fichier.service';
import { Utilisateur } from '../../model/utilisateur';
import { ServerConfigService } from '../../server-config.service';
import { UtilisateurService } from '../utilisateur.service';
import { FormadutilisateurService } from './formadutilisateur.service';
@Component({
  selector: 'app-formadutilisateur',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,MatButtonModule,MatFormFieldModule,MatInputModule],
  templateUrl: './formadutilisateur.component.html',
  styleUrl: './formadutilisateur.component.scss'
})
export class FormadutilisateurComponent {
  constructor(
    private fb:FormBuilder,
    public connS:ConnectionService,
    private route:Router,
    private serverp:ServerConfigService,
    private http:HttpClient,
    private FichierS:FichierService,
    public UtilisateurS:UtilisateurService,
    public FormadUtilisateurS:FormadutilisateurService
  ){}

   //exampleInputImg;
   ngOnInit(){
    this.FormadUtilisateurS.initForm(new Utilisateur())
   }
}
