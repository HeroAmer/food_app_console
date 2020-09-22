import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { Narudzba } from '../models/narudzba';

@Injectable({
  providedIn: 'root'
})
export class NotifikacijeService {
  notifikacijeCollection: AngularFirestoreCollection<Narudzba>;
  notifikacije: Observable<Narudzba[]>;

  constructor(public afs: AngularFirestore) {
    this.notifikacijeCollection = this.afs.collection('ordersUser', (ref) =>
    ref.where('status', '==', 'Čekanje')
  );

  this.notifikacije = this.notifikacijeCollection
    .snapshotChanges()
    .map((changes) => {
      return changes.map((c) => {
        const notifikacijeData = c.payload.doc.data() as Narudzba;
        return notifikacijeData;
      });
    });
  }

  getNotifikacije() {
    return this.notifikacije;
    console.log();
  }
}
