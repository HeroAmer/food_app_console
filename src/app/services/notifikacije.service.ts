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
  notificationsCollection: AngularFirestoreCollection<Narudzba>;
  notifications: Observable<Narudzba[]>;

  constructor(public afs: AngularFirestore) {
    this.notificationsCollection = this.afs.collection('ordersUser', (ref) =>
    ref.where('status', '==', 'Čekanje')
  );

  this.notifications = this.notificationsCollection
    .snapshotChanges()
    .map((changes) => {
      return changes.map((c) => {
        const notificationsData = c.payload.doc.data() as Narudzba;
        return notificationsData;
      });
    });
  }

  getNotifikacije() {
    return this.notifications;
  }
}
