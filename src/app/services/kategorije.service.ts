import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { Kategorija } from '../models/kategorija';

@Injectable({
  providedIn: 'root'
})
export class KategorijeService {
  kategorijaCollection: AngularFirestoreCollection<Kategorija>;
  kategorije: Observable<Kategorija[]>;

  constructor(public afs: AngularFirestore) {
    this.kategorijaCollection = this.afs.collection('kategorija');

    this.kategorije = this.kategorijaCollection
      .snapshotChanges()
      .map((newData) => {
        return newData.map((d) => {
          const kategorijaData = d.payload.doc.data() as Kategorija;
          kategorijaData.katID = d.payload.doc.id;
          return kategorijaData;
        });
      });
   }

   getKategorije() {
    return this.kategorije;
  }
   addKategorija(kategorija: Kategorija) {
    let katID = this.afs.createId();
    kategorija.katID = katID;
    this.afs.collection('kategorija').doc(katID).set(kategorija).then();
  }
}
