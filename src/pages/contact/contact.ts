import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import {SQLite} from 'ionic-native';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
people:any;
  constructor(public navCtrl: NavController,platform: Platform) {
    platform.ready().then(() => {
            this.refresh();
        });
  }

  public refresh() {
    let db = new SQLite();
            db.openDatabase({name: "data.db", location: "default"}).then(() => {
                db.executeSql("SELECT * FROM people", []).then((data) => {
            this.people = [];
            if(data.rows.length > 0) {
                for(var i = 0; i < data.rows.length; i++) {
                    this.people.push({firstname: data.rows.item(i).firstname, lastname: data.rows.item(i).lastname});
                }
            }
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
        });
            }, (error) => {
                console.log("ERROR: ", error);
            });

    }

}
