import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormadtypeVoitureComponent } from './formadtype-voiture/formadtype-voiture.component';
import { ListtypeVoitureComponent } from './listtype-voiture/listtype-voiture.component';

@Component({
  selector: 'app-type-voiture',
  standalone: true,
  imports: [FormadtypeVoitureComponent,ListtypeVoitureComponent,CommonModule],
  templateUrl: './type-voiture.component.html',
  styleUrl: './type-voiture.component.scss'
})
export class TypeVoitureComponent {


}
