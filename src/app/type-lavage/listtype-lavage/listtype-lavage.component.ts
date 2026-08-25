import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { EdittypeLavageService } from '../edittype-lavage/edittype-lavage.service';
import { FormadtypeLavageService } from '../formadtype-lavage/formadtype-lavage.service';
import { TypeLavageService } from '../type-lavage.service';

@Component({
  selector: 'app-listtype-lavage',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './listtype-lavage.component.html',
  styleUrl: './listtype-lavage.component.scss',
})
export class ListtypeLavageComponent {
  constructor(public TypeLavageS: TypeLavageService,
    public conns: ConnectionService,public FormadtypeLavageS:FormadtypeLavageService,
    public EdittypeLavageS:EdittypeLavageService

  ) {
  }
   userisouvrier:boolean=this.conns.userisOuvrier()
   userisadmin:boolean=this.conns.userisAdmin()
   userisclient:boolean=this.conns.userisClient()


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'weight', 'symbol', 'actions'];


  ngAfterViewInit() {
    this.TypeLavageS.paginator = this.paginator;
    this.TypeLavageS.getAllType_lavage()
  }
}
