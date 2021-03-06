import { Component, OnInit } from '@angular/core';
import { Hrana } from '../../../../models/hrana-unos';
import { Kategorija } from '../../../../models/kategorija';
import { finalize } from 'rxjs/operators';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HranaService } from 'src/app/services/hrana.service';
import { KategorijeService } from 'src/app/services/kategorije.service';

interface Kolicina {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss'],
})
export class InputDialogComponent implements OnInit {
  modifedKolicina: string;

  quantity: Kolicina[] = [
    { value: 'kg', viewValue: 'kilogram/a' },
    { value: 'l', viewValue: 'litar/a' },
  ];
  selectdQuantity = this.quantity[0];

  kategorije: Kategorija[];

  isDisabled = true;


  inputImage;
  hrana: Hrana = {
    naziv: '',
    kategorija: '',
    opis: '',
    cijena: '',
    oznaka: '',
    kolicina: '',
    mjernaJedinica: '',
    brojlajkova: 0,
    imageURL: '',
  };

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  constructor(
    private afStorage: AngularFireStorage,
    private hranaService: HranaService,
    private kategorijeService : KategorijeService
  ) {}

  ngOnInit(): void {
    this.kategorijeService.getKategorije().subscribe((kategorije) => {
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
            ///Once we get the firestorage img url, we can pass it down to cloud firestore
            this.inputImage = url;
            this.isDisabled = false;
          });
        })
      )
      .subscribe();
  }

  saveFood(form: NgForm) {
    this.hrana.imageURL = this.inputImage;
    console.log(this.quantity);
    this.hranaService.addHrana(this.hrana);
  }

}
