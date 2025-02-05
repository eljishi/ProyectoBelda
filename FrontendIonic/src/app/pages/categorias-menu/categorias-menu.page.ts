import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-categorias-menu',
  templateUrl: './categorias-menu.page.html',
  styleUrls: ['./categorias-menu.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CategoriasMenuPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
