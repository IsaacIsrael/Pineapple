import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'Pineapple Project';
  logo: string ='./images/logo.png';
  menu: any[] = [{icon:'perm_identity',description:'Fornecedores'},
        {icon:'collections_bookmark',description:'Amostras'},
        {icon:'drafts',description:'E-mail Templates'}];
}
