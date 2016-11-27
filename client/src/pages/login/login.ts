import { Component, Input } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import { Push, Device, Geolocation } from 'ionic-native'

import { MenuPage } from '../menu/menu';
import { HelpDetailPage } from '../help-detail/help-detail';
import { HelpResponsePage } from '../help-response/help-response';

import { Azure } from '../../services/azure';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @Input() username : String;
  @Input() password : String;

  position: any;

  deviceId: any;
  pushHandle: any;

  constructor(public platform: Platform, public azure: Azure, public navCtrl: NavController) {
    platform.ready().then(
      () => {
        let device = new Device();
        this.deviceId = Device.device.uuid || ("browser");
      }
    );
  }

  ionViewDidLoad() {
    this.azure.init();
  }

  login() {
    if(this.initPush() === undefined) {
      //in Browser - perform simple Login without push registration
      this.loginUser(undefined).then(
        () => console.log("Login Browser"),
        (e) => console.warn("Login Browser Failed", e)
      );
    }
  }

  initPush() {
    if(!this.platform.is('android')) {
      console.log("In Browser");
      return;
    }
    return Push.hasPermission().then(
      (result) => {
        if(result.isEnabled){
          var push = Push.init({
            android: {
                senderID: '977464918829'
            }
          });
          push.on("registration", (data) => {
            // Get the native platform of the device.
            var platform = Device.device.platform;
            // Get the this.pushHandle returned during registration.
            this.pushHandle = data.registrationId;
            this.loginUser(this.pushHandle).then(
              () => console.log("Login with Push"),
              () => console.warn("Login with Push Failed")
            );
            // Set the device-specific message template.
            if (platform == 'android' || platform == 'Android') {
                // Register for GCM notifications.
                this.azure.client.push.register('gcm', this.pushHandle, {
                    mytemplate: { body: { data: {
                      message: "{$(messageParam)}",
                      kategorieBez: "{$(kategorieBez)}",
                      anfrageId: "{$(anfrageID)}",
                      anfrageText: "{$(anfrageText)}",
                      maxEntfernung: "{$(maxEntfernung)}",
                    } } }
                }).then(
                  () => console.log("Azure Push registriert"),
                  () => console.log("Fehler bei Azure Push Registrierung")
                );
            } else if (Device.device.platform === 'iOS') {
                // Register for notifications.
                this.azure.client.push.register('apns', this.pushHandle, {
                    mytemplate: { body: { aps: { alert: "{$(messageParam)}" } } }
                });
            } else if (Device.device.platform === 'windows') {
                // Register for WNS notifications.
                this.azure.client.push.register('wns', this.pushHandle, {
                    myTemplate: {
                        body: '<toast><visual><binding template="ToastText01"><text id="1">$(messageParam)</text></binding></visual></toast>',
                        headers: { 'X-WNS-Type': 'wns/toast' } }
                });
            }

          });
          push.on('notification', (data) => {
            console.log(data);
            if(data.additionalData['Antworttext']) {
              this.navCtrl.push(HelpDetailPage, {antwort: data.additionalData,
                                                 anfrage: this.azure.aktuelleAnfrage});
            }
            this.navCtrl.push(HelpResponsePage, {notification: data.additionalData});
          });

          push.on('error', (e) => {
            console.log(e.message);
          });
        } else {
          console.log("Push not available!");
        }
      }
    );
  }

  register() {
    return this.azure.userTable.insert({
      id: this.deviceId,
      geraetenummer: this.deviceId,
      email: this.username,
      Name: "Doe",
      Vorname: "John",
    }).then(
      (r) => {
        console.log("User inserted", r),
        Geolocation.getCurrentPosition().then(
          (position) => {
            this.azure.positionTable.insert({
              id: this.deviceId,
              Breitengrad: position.coords.latitude,
              Laengengrad: position.coords.longitude,
              Nutzer_ID: this.deviceId,
            }).then(
              () => this.login()
            );
          },
          (e) => console.log("error")
        );
      },
      (e) => console.warn("Fehler Nutzer anlegen", e.message)
    );
  }

  loginUser(pushHandle) {
    Geolocation.getCurrentPosition().then(
      (position) => {
        this.azure.positionTable.update({
          id: this.deviceId,
          Breitengrad: position.coords.latitude,
          Laengengrad: position.coords.longitude,
          Nutzer_ID: this.deviceId,
        });
      },
      (e) => console.log("error")
    );
    return this.azure.userTable.update({
      id: this.deviceId,
      email: this.username,
      nachrichtenregistrierungs_id: this.pushHandle,
      letzteAnmeldung: new Date().toISOString()
    }).then(
      (r) => {
        console.log("Nutzer angemeldet", r);
        this.azure.setUser(r);
        this.navCtrl.setRoot(MenuPage);
      },
      (e) => console.log("Fehler bei Nutzer anmelden", e.message)
    );
  }

}
