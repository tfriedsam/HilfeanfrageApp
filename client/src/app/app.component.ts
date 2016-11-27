import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar,
         Splashscreen} from 'ionic-native';
import { Azure } from '../services/azure';

import { LoginPage } from '../pages/login/login';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LoginPage;
  client: any;
  table: any;
  deviceId: any;

  constructor(public azure: Azure, platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.azure.init();
    });
  }

  testDbAccess() {
      this.table = this.client.getTable('TodoItem');
      console.log(this.table);
      this.table.lookup ('1').then(
        (r) => console.log(r),
        (e) => console.log(e)
      );
  }
}
