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


@Component({
  selector: 'app-novi-unos',
  templateUrl: './novi-unos.component.html',
  styleUrls: ['./novi-unos.component.css'],
})
export class NoviUnosComponent implements OnInit {
  /// Things below is for table content
  displayedColumns: string[] = ['image', 'naziv', 'opis', 'cijena', 'execute'];
  hrana:Hrana[];


  constructor(public dialog: MatDialog, public itemService: ItemService) {}
  openDialog() {
    const dialogRef = this.dialog.open(InputDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  cl() {
    alert('User has been edited!');
  }

  ngOnInit(): void {
    this.itemService.getFood().subscribe(hrana => {
      this.hrana = hrana;
    })
  }


}





