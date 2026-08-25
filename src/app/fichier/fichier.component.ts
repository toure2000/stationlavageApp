import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConnectionService } from '../authentification/connection/connection.service';
import { FichierService } from './fichier.service';
import { FormfichierComponent } from './formfichier/formfichier.component';
import { ListfichierComponent } from './listfichier/listfichier.component';

@Component({
  selector: 'app-fichier',
  standalone: true,
  imports: [ListfichierComponent,FormfichierComponent,CommonModule],
  templateUrl: './fichier.component.html',
  styleUrl: './fichier.component.scss'
})
export class FichierComponent {
    constructor(private fichierS:FichierService,private conns:ConnectionService){}
    ngOnInit(){
       this.fichierS.getAllFichier()
    }
}
