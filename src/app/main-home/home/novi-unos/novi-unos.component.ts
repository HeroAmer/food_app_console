import { Component, OnInit } from '@angular/core';
import { InputDialogComponent } from './input-dialog/input-dialog.component';
import {MatDialog} from '@angular/material/dialog';
// import {ItemService} from '../../../services/item-service.service';
// import {Hrana} from '../../../models/hrana-unos';
// import { finalize } from 'rxjs/operators';
// import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
// import { Observable } from 'rxjs';



@Component({
  selector: 'app-novi-unos',
  templateUrl: './novi-unos.component.html',
  styleUrls: ['./novi-unos.component.css']
})
export class NoviUnosComponent implements OnInit {

  ngOnInit(){

  }
  // urlTest;
  // hrana: Hrana = {
  //   naziv : '',
  //   kategorija:'',
  //   opis:'',
  //   cijena:'',
  //   oznaka:'',
  //   kolicina:'',
  //   imageURL:''
  // }

  // ref:AngularFireStorageReference;
  // task:AngularFireUploadTask;
  // downloadURL:Observable<string>;
  // constructor(private afStorage:AngularFireStorage, private itemService: ItemService) {}
  constructor(public dialog: MatDialog) {}
  openDialog() {
    const dialogRef = this.dialog.open(InputDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

  // ngOnInit(): void {
  // }

//   upload(event){
//     const id = Math.random().toString(36).substring(2);
//     this.ref = this.afStorage.ref(id);
//     this.task = this.ref.put(event.target.files[0]);
//     this.task.snapshotChanges().pipe(
//       finalize(() => {
//         this.ref.getDownloadURL().subscribe(url => {
//           console.log(url);
//           this.urlTest = url; // <-- do what ever you want with the url..
//         });
//       })
//     ).subscribe();
//   }

// saveFood(){
//   this.hrana.imageURL = this.urlTest;
//   this.itemService.addHrana(this.hrana);
// }

