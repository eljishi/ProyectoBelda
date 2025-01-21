import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {hammer, homeOutline, listOutline, paw, searchOutline} from "ionicons/icons";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonicModule]
})
export class TabsPage implements OnInit {

  constructor() {
    addIcons({homeOutline,searchOutline,listOutline})
  }

  ngOnInit() {
  }

}
