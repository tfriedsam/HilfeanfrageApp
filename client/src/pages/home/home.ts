import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Azure } from "../../services/azure";

import { HelpRequestPage } from "../help-request/help-request"

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
    this.navCtrl.push(HelpRequestPage)
  }
}
