import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from "ionic-native";

import { Azure } from "../../services/azure";

import { HelpWaitPage } from "../help-wait/help-wait";

/*
  Generated class for the RequestHelp page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-help-request',
  templateUrl: 'help-request.html'
})
export class HelpRequestPage {

  kategorien: any = [];
  anfrage: any = {}

  constructor(public azure: Azure, public navCtrl: NavController) {}

  ionViewDidLoad() {
    this.azure.init();
    this.azure.anfragekategorieTable.read().then(
      (r) => {
        this.kategorien = r;
        this.anfrage.Anfragekategorie_ID = r[0].id;
        console.log("anfragekonfig fetched", r)
      },
      (e) => console.warn(e)
    );
    this.anfrage.Nutzer_ID = this.azure.user.id;
  }

  callForHelp() {
    return Geolocation.getCurrentPosition().then(
      (position) => {
        this.anfrage.Breitengrad = position.coords.latitude;
        this.anfrage.Laengengrad = position.coords.longitude;
        this.azure.anfrageTable.insert(this.anfrage).then(
          (r) => {
            console.log("Anfrage erstellt!", r);
            this.azure.aktuelleAnfrage = r;
            this.navCtrl.setRoot(HelpWaitPage);
          },
          (e) => console.warn("Fehler Anfrage erstellen", e.message)
      );
    });
  }

  selectKategorie() {
    console.log("kategorie changed", this.anfrage, this.kategorien);
    for(let i = 0; i < this.kategorien.length; i++) {
      if(this.kategorien[i].id == this.anfrage.Anfragekategorie_ID) {
        this.anfrage.Anfragetext = this.kategorien[i].bezeichnung;
      }
    }
  }

}
