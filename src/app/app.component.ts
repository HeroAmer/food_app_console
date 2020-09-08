import { Component } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFirestoreCollection} from '@angular/fire/firestore'

import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'food-app-console';
  description = 'Angular-Zeljo';

  // itemValue = '';
  // items: Observable<any[]>;

  // constructor(public db: AngularFireDatabase){
  //   this.items = db.list('items').valueChanges();
  // }

  // onSubmit() {
  //   this.db.list('items').push({content: this.itemValue});
  //   this.itemValue = '';
  // }
  constructor( private firestore: AngularFirestore ) {}
  exampleCreate(data){
    return new Promise<any>((resolve, reject) => {
       this.firestore
           .collection("collectionNameHere")
           .add(data)
           .then(
               res => {},
               err => reject(err)
           )
    }
 )}
}
