import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { HelpRequestPage } from '../help-request/help-request';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'menu.html'
})
export class MenuPage {
  // should be each tab's root Page
  pages: any;
  rootPage = HomePage;

  constructor(public navCtrl: NavController) {
    this.pages = [
      {title: "Start", page: HomePage, icon: "home"},
      {title: "Anfrage stellen", page: HelpRequestPage, icon: "notifications"},
      // {title: "Aktive Anfrage", page: {}, icon: "contact"},
      // {title: "Anfrage beantworten", page: {}, icon: "left-a"},
      {title: "Einstellungen", page: SettingsPage, icon: "settings"},
      // {title: "Einstellungen", page: {}, icon: "login"}
    ];
  }

  openPage(page) {
    console.log("navigate to", page);
    this.navCtrl.push(page.page);
  }
}
