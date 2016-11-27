import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the HelpWait page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-help-wait',
  templateUrl: 'help-wait.html'
})
export class HelpWaitPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello HelpWaitPage Page');
  }

}
