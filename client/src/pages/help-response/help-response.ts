import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

import { Azure } from '../../services/azure';


@Component({
  selector: 'page-help-response',
  templateUrl: 'help-response.html'
})
export class HelpResponsePage {

  notification: any;
  antwort: any = {};

  constructor(public azure: Azure, public navCtrl: NavController, navParams: NavParams) {
    console.log("constructor")
    console.log(navParams);
    console.log(navParams.get('notification'));
    this.notification = navParams.get('notification');
  }

  ionViewDidLoad() {

  }

  decline() {
    this.navCtrl.setRoot(HomePage);
  }

  accept() {
    this.antwort.Nutzer_ID = this.azure.user.id;
    this.antwort.Anfrage_ID = this.notification.anfrageId;
    this.azure.antwortTable.insert(this.antwort)
  }

}
