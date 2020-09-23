import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable, combineLatest, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import { Users, Narudzbe } from '../models/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  ordersCollection: AngularFirestoreCollection<Narudzbe>;
  orders: Observable<Narudzbe[]>;

  constructor(public afs: AngularFirestore) { }

  collectionInitialization() {
    this.ordersCollection = this.afs.collection('ordersUser', (ref) => {
      return ref.orderBy('datum', 'desc');
    });
    this.orders = this.ordersCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((change) => {
          const data = change.payload.doc.data() as Narudzbe;
          const orderId = data.uid;
          const address = data.orderAddress;
          const total = data.orderTotal;
          const status = data.status;
          const code = data.orderCode;
          const datumKreiranja = data.datum;
          const jelo = data.orderJelo;
          const komentar = data.orderKomentar;
          const doplata = data.orderDoplata;
          const narudzba_id = data.orderID;
          return this.afs
            .doc('users/' + orderId)
            .valueChanges()
            .pipe(
              map((usersData: Users) => {
                return Object.assign({
                  orderID :narudzba_id,
                  phone: usersData?.phone,
                  fullName: usersData?.fullName,
                  datum: datumKreiranja,
                  orderAddress: address,
                  orderTotal: total,
                  status: status,
                  orderCode: code,
                  orderJelo: jelo,
                  orderKomentar: komentar,
                  orderDoplata: doplata,
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
    return this.orders;
  }

  zavrsiMultiple(selectedOrders){
    selectedOrders.forEach(element => {
      this.afs.collection('ordersUser').doc(element).update({
        status:'Završeno'
      });
    });
  }

  zavrsiNarudzbu(narudzba_id){
    this.afs.collection('ordersUser').doc(narudzba_id).update({
      status:'Završeno'
    });
  }
}
