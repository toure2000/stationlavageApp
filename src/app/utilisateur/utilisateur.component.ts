import { Component } from '@angular/core';
import { FormadutilisateurComponent } from './formadutilisateur/formadutilisateur.component';
import { ListutilisateurComponent } from './listutilisateur/listutilisateur.component';

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [FormadutilisateurComponent,ListutilisateurComponent],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.scss'
})
export class UtilisateurComponent {

}
