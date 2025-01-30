import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar, IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonIcon,
  IonImg, IonTabButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";
import {addIcons} from "ionicons";
import {ellipsisVerticalOutline} from "ionicons/icons";

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.page.html',
  styleUrls: ['./cabecera.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonAvatar, IonImg, RouterLink, IonButtons, IonBackButton, IonIcon, IonTabButton]
})
export class CabeceraPage implements OnInit {

  constructor() {
    addIcons({ellipsisVerticalOutline})
  }

  ngOnInit() {
  }

}
