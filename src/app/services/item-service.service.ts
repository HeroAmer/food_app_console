import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { Hrana } from '../models/hrana-unos';
@Injectable({
  providedIn: 'root',
})
export class ItemService {

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  hranaCollection: AngularFirestoreCollection<Hrana>;
  hrana: Observable<Hrana[]>;

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



    this.hranaCollection = this.afs.collection('unos_hrane', (ref) =>
    ref.orderBy('description', 'asc')
  );
  this.hrana = this.itemsCollection.snapshotChanges().map((changes) => {
    return changes.map((a) => {
      const data = a.payload.doc.data() as Hrana;
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

  addHrana(hrana:Hrana){
    this.hranaCollection.add(hrana)
  }
}
