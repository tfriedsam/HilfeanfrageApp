import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Geolocation } from 'ionic-native';

import { Azure } from "../../services/azure";

declare var google;

/*
  Generated class for the HelpDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-help-detail',
  templateUrl: 'help-detail.html'
})
export class HelpDetailPage {

  showNavigation = false;

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directions') directionElement: ElementRef;

  map: any;
  posMarker: any;
  destMarker: any;

  directionsService: any;
  directionsDisplay: any;

  anfrage: any;
  antwort: any;
  antwortNutzer: any;
  anfrageNutzer: any;

  fromAnfrage: any;

  constructor(public azure: Azure, public navCtrl: NavController, navParams: NavParams) {
    console.log("Help Detail", navParams);
    this.anfrage = navParams.get('anfrage');
    this.antwort = navParams.get('antwort');
    this.fromAnfrage = navParams.get('fromAnfrage')
    console.log("fromAnfrage", this.fromAnfrage);
  }

  ionViewDidLoad(){
    this.loadMap();
    if(this.fromAnfrage) {
      console.log("As Hilfesuchender");
      this.anfrageNutzer = this.azure.user;
      console.log("Suche Nutzer", this.antwort.Nutzer_ID);
      this.azure.userTable.lookup(this.antwort.Nutzer_ID).then(
        (result) => {
          console.log("Setze nutzer", result);
          this.antwortNutzer = result;
        }
      )
    } else {
      console.log("As Helfer");
      this.antwortNutzer = this.azure.user;
      console.log("Frage ab", this.anfrage.anfrageId);
      this.azure.anfrageTable.lookup(this.anfrage.anfrageId).then(
        (result) => {
          console.log("setze Anfrage", result);
          result.maxEntfernung = this.anfrage.maxEntfernung;
          this.anfrage = result;
          this.navigateTo(result.Laengengrad, result.Breitengrad);
          console.log("Suche nutzer", result.Nutzer_ID);
          this.azure.userTable.lookup(result.Nutzer_ID).then(
            (aUser) => {
              console.log("Setze Nutzer", aUser);
              this.anfrageNutzer = aUser;
            }
          )
        }
      )
    }
  }

  loadMap(){
    let mapOptions = {
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    console.log("loading map");
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.posMarker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      label: "Start"
    });
    Geolocation.getCurrentPosition().then((position) => {
      let latitude = parseFloat(position.coords.latitude.toFixed(3));
      let longitude = parseFloat(position.coords.longitude.toFixed(3));
      let latLng = new google.maps.LatLng(latitude, longitude);
      this.map.panTo(latLng);
      this.posMarker.setPosition(latLng);

    }, (err) => {
      console.log(err)
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: false,
      panel: this.directionElement.nativeElement,
      map: this.map
    });
  }

  navigateTo(long, lat) {
    let dest = new google.maps.LatLng(lat, long);
    this.directionsService.route({
      origin: this.posMarker.getPosition(),
      destination: dest,
      travelMode: google.maps.TravelMode.WALKING
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
        this.posMarker.setVisible(false);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}
