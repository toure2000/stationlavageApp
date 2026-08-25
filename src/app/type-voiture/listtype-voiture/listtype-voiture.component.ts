import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { FormadtypeVoitureService } from '../formadtype-voiture/formadtype-voiture.service';
import { TypeVoitureService } from '../type-voiture.service';

@Component({
  selector: 'app-listtype-voiture',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatButtonModule,MatIconModule,MatDialogModule],
  templateUrl: './listtype-voiture.component.html',
  styleUrl: './listtype-voiture.component.scss'
})

export class ListtypeVoitureComponent implements AfterViewInit {
  constructor(public TypeVoitureS: TypeVoitureService, public conns: ConnectionService,public FormadtypeVoitureS:FormadtypeVoitureService) {
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'weight', 'actions'];


  ngAfterViewInit() {
    this.TypeVoitureS.paginator = this.paginator;
    this.TypeVoitureS.getAllType_voiture()
  }

}
