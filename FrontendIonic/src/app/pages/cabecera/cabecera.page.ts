import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar, IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonIcon,
  IonImg, IonMenuToggle, IonTabButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router, RouterLink} from "@angular/router";
import {addIcons} from "ionicons";
import {arrowBackOutline, ellipsisVerticalOutline} from "ionicons/icons";

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.page.html',
  styleUrls: ['./cabecera.page.scss'],
  standalone: true,
  imports: [ IonHeader, IonToolbar, CommonModule, FormsModule, IonButton, IonAvatar, IonImg, RouterLink, IonButtons, IonIcon, IonMenuToggle]
})
export class CabeceraPage implements OnInit {
  private readonly router: Router = inject(Router);

  constructor() {
    addIcons({ellipsisVerticalOutline,arrowBackOutline})
  }

  ngOnInit() {
  }

  backButton() {
    this.router.navigateByUrl(this.router.lastSuccessfulNavigation?.previousNavigation?.extractedUrl.toString() as string)
  }
}
