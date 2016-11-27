import { Injectable } from '@angular/core';

import azureMobileClient from 'azure-mobile-apps-client';

@Injectable()
export class Azure {
  client: any;
  user: any;
  aktuelleAnfrage: any;

  userTable: any;
  konfigTable: any;
  nutzerkategorieTable: any;
  anfrageTable: any;
  anfragekategorieTable: any;
  antwortTable: any;
  positionTable: any;

  constructor() {}

  init() {
    if(this.client === undefined) {
      console.log("initialisiert");
      this.client = new azureMobileClient.MobileServiceClient('https://neuenaehehilfeanfrage.azurewebsites.net');
      this.userTable = this.client.getTable('Nutzer');
      this.konfigTable = this.client.getTable('Nutzerkonfiguration');
      this.nutzerkategorieTable = this.client.getTable('Nutzerkategorie');
      this.anfrageTable = this.client.getTable('Anfrage');
      this.anfragekategorieTable = this.client.getTable('Anfragekategorie');
      this.antwortTable = this.client.getTable('Antwort');
      this.positionTable = this.client.getTable('Position');
    } else {
      console.log("azure already initialized");
    }
  }

  setUser(user) {
    this.user = user;
  }

  getUser() {
    this.user;
  }
}