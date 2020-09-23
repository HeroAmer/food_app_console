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
  categoriesCollection: AngularFirestoreCollection<Kategorija>;
  categories: Observable<Kategorija[]>;

  constructor(public afs: AngularFirestore) {
    this.categoriesCollection = this.afs.collection('kategorija');

    this.categories = this.categoriesCollection
      .snapshotChanges()
      .map((newData) => {
        return newData.map((d) => {
          const categoryData = d.payload.doc.data() as Kategorija;
          categoryData.katID = d.payload.doc.id;
          return categoryData;
        });
      });
   }

   getKategorije() {
    return this.categories;
  }
   addKategorija(category: Kategorija) {
    let katID = this.afs.createId();
    category.katID = katID;
    this.afs.collection('kategorija').doc(katID).set(category).then();
  }
}
