import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { FichierService } from '../../fichier/fichier.service';
import { Utilisateur } from '../../model/utilisateur';
import { ServerConfigService } from '../../server-config.service';
import { FormadutilisateurService } from '../formadutilisateur/formadutilisateur.service';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'app-formmodifutilisateur',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,MatDialogModule,MatButtonModule,MatFormFieldModule,MatInputModule],
  templateUrl: './formmodifutilisateur.component.html',
  styleUrl: './formmodifutilisateur.component.scss'
})
export class FormmodifutilisateurComponent {
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
   @ViewChild('profileimage')
   profileimage!:ElementRef;

   //exampleInputImg;
   ngOnInit(){

    this.FormadUtilisateurS.initForm(new Utilisateur())
   }

   setProfileFromForm(url:string){
       let image= this.profileimage.nativeElement as HTMLImageElement
       image.src=url;
   }

   ngAfterViewInit(){
        setTimeout(() => {
          this.setProfileFromForm(this.FormadUtilisateurS.user.picture)
        }, 200);
   }
}
