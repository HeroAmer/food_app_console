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
// import {ItemService} from '../../../services/item-service.service';
// import {Hrana} from '../../../models/hrana-unos';
// import { finalize } from 'rxjs/operators';
// import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
// import { Observable } from 'rxjs';

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
  /// Things below is for table content
  displayedColumns: string[] = ['image', 'naziv', 'opis', 'cijena', 'execute'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}
  openDialog() {
    const dialogRef = this.dialog.open(InputDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  cl() {
    alert('User has been edited!');
  }

  ngOnInit(): void {}


}





