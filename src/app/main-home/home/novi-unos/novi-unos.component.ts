import { Component, OnInit } from '@angular/core';
import { InputDialogComponent } from './input-dialog/input-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ItemService } from '../../../services/item-service.service';
import { Hrana } from '../../../models/hrana-unos';
import { finalize } from 'rxjs/operators';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';

export interface PeriodicElement {
  image: string;
  naziv: string;
  opis: string;
  cijena: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    image: 'Slika',
    naziv: 'Ustipci od heljde',
    opis: '300gr, uštipaka',
    cijena: 10.0,
  },
  {
    image: 'Slika',
    naziv: 'Cevapi s lukom',
    opis: '400gr, salata',
    cijena: 21.8,
  },
  {
    image: 'Slika',
    naziv: 'Futrovane pljeskavice',
    opis: '500gr, prilog',
    cijena: 15.6,
  },
];
@Component({
  selector: 'app-novi-unos',
  templateUrl: './novi-unos.component.html',
  styleUrls: ['./novi-unos.component.css'],
})
export class NoviUnosComponent implements OnInit {
  displayedColumns: string[] = ['image', 'naziv', 'opis', 'cijena', 'execute'];
  dataSource = ELEMENT_DATA;

  cl() {
    alert('User has been edited!');
  }
  urlTest;
  hrana: Hrana = {
    naziv: '',
    kategorija: '',
    opis: '',
    cijena: '',
    oznaka: '',
    kolicina: '',
    imageURL: '',
  };

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  constructor(
    private afStorage: AngularFireStorage,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {}

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe((url) => {
            console.log(url);
            this.urlTest = url; // <-- do what ever you want with the url..
          });
        })
      )
      .subscribe();
  }

  saveFood() {
    this.hrana.imageURL = this.urlTest;
    this.itemService.addHrana(this.hrana);
  }
}
