import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(public afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection('items', (ref) =>
      ref.orderBy('description', 'asc')
    );
    // this.items = firestore.collection('items').valueChanges();
    this.items = this.itemsCollection.snapshotChanges().map((changes) => {
      return changes.map((a) => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getItems() {
    return this.items;
  }

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }
}
