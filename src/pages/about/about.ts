import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import {SQLite} from 'ionic-native';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
firstName:string;
 lastName:string;
  constructor(public navCtrl: NavController,platform: Platform) {
    platform.ready().then(() => {
            
        });
  }
 
  public SubmitData()
  {
    //Validation for mandatory fields
    if(typeof this.firstName == 'undefined' || this.firstName == null || this.firstName=='')
    {
      alert('Please enter the first name.');
      return false;
    }
    if(typeof this.lastName == 'undefined' || this.lastName == null || this.lastName=='')
    {
      alert('Please enter the last name.');
      return false;
    } 

    //Starting database operations
    let db = new SQLite();
    let query = "INSERT INTO people (firstname, lastname) VALUES ('"+ this.firstName+"', '"+this.lastName +"')";
    
            db.openDatabase({name: "data.db", location: "default"}).then(() => {
                db.executeSql(query, []).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data));
            alert('User has been registered successfully.');
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error.err)); //error while executing query
        });
            }, (error) => {
                console.log("ERROR: ", error); //error while opening database
            });
    
  }

}
