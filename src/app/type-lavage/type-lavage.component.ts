import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConnectionService } from '../authentification/connection/connection.service';
import { FormadtypeLavageComponent } from './formadtype-lavage/formadtype-lavage.component';
import { ListtypeLavageComponent } from './listtype-lavage/listtype-lavage.component';

@Component({
  selector: 'app-type-lavage',
  standalone: true,
  imports: [FormadtypeLavageComponent,ListtypeLavageComponent,CommonModule],
  templateUrl: './type-lavage.component.html',
  styleUrl: './type-lavage.component.scss'
})
export class TypeLavageComponent {
  userisouvrier:boolean=this.conns.userisOuvrier()
  userisadmin:boolean=this.conns.userisAdmin()
  userisclient:boolean=this.conns.userisClient()

    constructor(public conns:ConnectionService){}
}
