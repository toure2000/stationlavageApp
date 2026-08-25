import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { Utilisateur } from '../../model/utilisateur';
import { FormadutilisateurComponent } from '../formadutilisateur/formadutilisateur.component';
import { FormadutilisateurService } from '../formadutilisateur/formadutilisateur.service';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'app-listutilisateur',
  standalone: true,
  imports: [
    CommonModule,
    FormadutilisateurComponent,
    MatTableModule,
    MatPaginatorModule],
  templateUrl: './listutilisateur.component.html',
  styleUrl: './listutilisateur.component.scss'
})
export class ListutilisateurComponent {
  th:string=`
  backgroundColor: blue;
  `
  @ViewChild("divoperationUtilisateur")
  divoperationUtilisateur!:ElementRef

   constructor(
    public UtilisateurS:UtilisateurService,
    public conns:ConnectionService,
    public FormadUtilisateurS:FormadutilisateurService,
   ){}
   getimurl(){

   }

   // NB: waiting =statue color jaunre; active=status color vert

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   displayedColumns: string[] = ['name', 'actions'];

   toUSER(elem:any){
    return elem as Utilisateur
   }
   ngAfterViewInit() {
     this.UtilisateurS.paginator = this.paginator;
     this.UtilisateurS.getAllUtilisateur()
   }

   afficherModif(med:Utilisateur){
    this.FormadUtilisateurS.initFormModif(med)
    let div=this.divoperationUtilisateur.nativeElement as HTMLElement
    div.style.display= "block"
   }
   fermerModif(){
    this.FormadUtilisateurS.initForm(new Utilisateur())
    this.FormadUtilisateurS.typeOperation='ajouter'
    let div=this.divoperationUtilisateur.nativeElement as HTMLElement
    div.style.display= "none"
   }
   ngOnInit(){
    this.UtilisateurS.getAllUtilisateur()
    /*
      $('[data-toggle="tooltip"]').tooltip()
      */

   }
}
