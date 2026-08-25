import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormadlavageComponent } from '../formadlavage/formadlavage.component';
import { FormadflotantService } from './formadflotant.service';

@Component({
  selector: 'app-formadflotant',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormadlavageComponent
  ],
  templateUrl: './formadflotant.component.html',
  styleUrl: './formadflotant.component.scss'
})
export class FormadflotantComponent {
  constructor(private FormadflotantS:FormadflotantService,private route:Router){}
  public isopen=()=>{return this.FormadflotantS.isOpen()}
  fermer(){
    this.FormadflotantS.hide()
  }
  ngOnInit(){
    if(this.route.url.indexOf('FormadflotantComponent')>=0){
      this.FormadflotantS.setIsOpen(true)
    }

  }
  ngOnDestroy() {
      this.FormadflotantS.setIsOpen(false)
  }

}
