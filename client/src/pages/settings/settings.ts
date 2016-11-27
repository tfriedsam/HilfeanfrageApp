import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Device } from 'ionic-native'

import { Azure } from '../../services/azure';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  userTable: any;
  konfigTable: any;
  kategorieTable: any;
  deviceId: any;
  user: any = {};

  konfig: any = {
    Wartezeit: 10,
    Umkreis: 250
  };
  kategorien: any = [];

  constructor(public azure: Azure, public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.deviceId = Device.device.uuid || ("browser");
    this.azure.init();
    this.userTable = this.azure.client.getTable('Nutzer');
    this.userTable.lookup(this.deviceId).then(
      (r) => {
        this.user = r;
        console.log("User fetched", r)
      },
      (e) => console.warn(e)
    );
    this.konfigTable = this.azure.client.getTable('Nutzerkonfiguration');
    this.konfigTable.lookup(this.deviceId).then(
      (r) => {
        this.konfig = r;
        console.log("Userkonfig fetched", r)
      },
      (e) => console.warn(e)
    );

    this.kategorieTable = this.azure.client.getTable('Nutzerkategorie');
    this.kategorieTable.read().then(
      (r) => {
        this.kategorien = r;
        console.log('kategorien', r);
      },
      (e) => console.warn(e)
    );
  }

  save() {
    if(this.konfig.id) {
      this.konfigTable.update(this.konfig);
    } else {
      this.konfig.id = this.deviceId;
      this.konfig.Nutzer_ID = this.deviceId;
      this.konfigTable.insert(this.konfig);
    }
  }

}
