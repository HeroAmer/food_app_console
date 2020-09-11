import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ItemService} from '../../../../services/item-service.service';
import {Hrana} from '../../../../models/hrana-unos';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit {

  urlTest;
  hrana: Hrana = {
    naziv : '',
    kategorija:'',
    opis:'',
    cijena:'',
    oznaka:'',
    kolicina:'',
    imageURL:''
  }

  ref:AngularFireStorageReference;
  task:AngularFireUploadTask;
  downloadURL:Observable<string>;
  constructor(private afStorage:AngularFireStorage, private itemService: ItemService) {}


  ngOnInit(): void {
  }

  upload(event){
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          console.log(url);
          this.urlTest = url; // <-- do what ever you want with the url..
        });
      })
    ).subscribe();
  }

saveFood(){
  this.hrana.imageURL = this.urlTest;
  this.itemService.addHrana(this.hrana);
}

}
