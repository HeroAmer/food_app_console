import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Hrana } from '../models/hrana-unos';


@Injectable({
  providedIn: 'root'
})
export class HranaService {

  foodCollection: AngularFirestoreCollection<Hrana>;
  food: Observable<Hrana[]>;

  constructor(public afs: AngularFirestore) {

    this.foodCollection = this.afs.collection('unos_hrane', (ref) => {
      return ref.orderBy('naziv', 'asc');
    });

    this.food = this.foodCollection.snapshotChanges().map((newData) => {
      return newData.map((b) => {
        const foodData = b.payload.doc.data() as Hrana;
        // hranaData.id = b.payload.doc.id;
        return foodData;
      });
    });
  }

  getFood() {
    return this.food;
  }
  addHrana(food: Hrana) {
    this.foodCollection.add(food).then(() => {
      alert('Uspjesan unos!');
    });
  }

}
