import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Azure } from "../../services/azure";

import { HelpRequestPage } from "../help-request/help-request"
import { SettingsPage } from "../settings/settings"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public azure: Azure, public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    this.azure.init();
  }

  goToHelp() {
    this.navCtrl.setRoot(HelpRequestPage);
  }

  goToSettings() {
    this.navCtrl.push(SettingsPage);
  }
}
