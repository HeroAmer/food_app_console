import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs';
import { OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable, combineLatest, of } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService implements OnInit {

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  darkMode;
  newMode = new Subject<boolean>();

  constructor(public afs: AngularFirestore) {
}
  ngOnInit() {
  }

  changeMode(mode){
    this.newMode.next(mode);
  }

  getNewMode(){
    return this.newMode.asObservable();
  }

  getMode(){
    return this.darkMode;
  }

  getItems() {
    return this.items;
  }
  addItem(item: Item) {
    this.itemsCollection.add(item);
  }

}
