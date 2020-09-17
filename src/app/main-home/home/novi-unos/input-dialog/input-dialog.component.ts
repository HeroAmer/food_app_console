import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemService } from '../../../../services/item-service.service';
import { Hrana } from '../../../../models/hrana-unos';
import { Kategorija } from '../../../../models/kategorija';
import { finalize } from 'rxjs/operators';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css'],
})
export class InputDialogComponent implements OnInit {
  kategorije: Kategorija[];

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  isDisabled = true;

  @ViewChild('btnClose') btnClose: ElementRef;
  zatvori() {
    this.btnClose.nativeElement.click();
  }

  urlTest;
  hrana: Hrana = {
    naziv: '',
    kategorija: '',
    opis: '',
    cijena: '',
    oznaka: '',
    kolicina: '',
    brojlajkova: 0,
    imageURL: '',
  };

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  constructor(
    private afStorage: AngularFireStorage,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.itemService.getKategorije().subscribe((kategorije) => {
      this.kategorije = kategorije;
    });
  }

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
            this.isDisabled = false;
          });
        })
      )
      .subscribe();
  }

  saveFood() {
    this.hrana.imageURL = this.urlTest;
    this.itemService.addHrana(this.hrana);
  }
  closeDialog() {
    console.log('Dialog closed!');
  }
}
