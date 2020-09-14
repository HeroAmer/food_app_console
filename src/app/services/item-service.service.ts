import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable, combineLatest, of } from 'rxjs';
import { concat } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Item } from '../models/item';
import { Hrana } from '../models/hrana-unos';
import { Narudzba } from '../models/narudzba';
import { Users, Order, Narudzbe } from '../models/orders';
import { uniq, flatten } from 'lodash';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ItemService implements OnInit {
  ordersCollection: AngularFirestoreCollection<Order>;
  orderItem: Observable<Narudzbe[]>;
  // all$: Observable<{users: Users[], orders: Order[]}>
  // ordersCollection: AngularFirestoreCollection<Order>;
  // order$: Observable<Order[]>;

  // usersCollection: AngularFirestoreCollection<Users>;
  // users$: Observable<Users[]>;

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  hranaCollection: AngularFirestoreCollection<Hrana>;
  hrana: Observable<Hrana[]>;

  notifikacijeCollection: AngularFirestoreCollection<Narudzba>;
  notifikacije:Observable<Narudzba[]>;


  constructor(public afs: AngularFirestore) {
    // this.itemsCollection = this.afs.collection('items', (ref) =>
    //   ref.where('description','==','This is item 2')
    // );

    // // this.items = firestore.collection('items').valueChanges();
    // this.items = this.itemsCollection.snapshotChanges().map((changes) => {
    //   return changes.map((a) => {
    //     const data = a.payload.doc.data() as Item;
    //     data.id = a.payload.doc.id;
    //     return data;
    //   });
    // });

    ///Uzimanje narudzbi kojima je status = false , da bi ih pokazali u notifikacijama
    this.notifikacijeCollection = this.afs.collection('ordersUser', (ref) =>
      ref.where('status', '==', false )

    );

    this.notifikacije = this.notifikacijeCollection.snapshotChanges().map((changes) => {
      return changes.map((c)=> {
        const notifikacijeData = c.payload.doc.data() as Narudzba;
        return notifikacijeData;
      });
    })

    this.hranaCollection = this.afs.collection('unos_hrane');

    this.hrana = this.hranaCollection.snapshotChanges().map((newData) => {
      return newData.map((b) => {
        const hranaData = b.payload.doc.data() as Hrana;
        // hranaData.id = b.payload.doc.id;
        return hranaData;
      });
    });
  }
  collectionInitialization() {
    this.ordersCollection = this.afs.collection('ordersUser');
    this.orderItem = this.ordersCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((change) => {
          const data = change.payload.doc.data() as Narudzbe;
          const orderId = data.uid;
          const address = data.orderAddress;
          const total = data.orderTotal;
          const status = data.status;
          return this.afs
            .doc('users/' + orderId)
            .valueChanges()
            .pipe(
              map((usersData: Users) => {
                return Object.assign({
                  phone: usersData?.phone,
                  fullName: usersData?.fullName,
                  orderAddress: address,
                  orderTotal: total,
                  status: status,
                });
              })
            );
        });
      }),
      flatMap((feeds) => combineLatest(feeds))
    );
  }

  selectAllOrders() {
    this.collectionInitialization();
    return this.orderItem;
  }

  ngOnInit() {
    this.orderItem.forEach((value) => {
      console.log(value);
    });
  }

  getItems() {
    return this.items;
  }

  getFood() {
    return this.hrana;
  }

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }

  getNotifikacije(){
    return this.notifikacije;
  }


  addHrana(hrana: Hrana) {
    this.hranaCollection.add(hrana);
    alert('Uspješno ste dodali novi unos');
  }
}
