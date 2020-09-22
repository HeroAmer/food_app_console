import { Component, OnInit } from '@angular/core';
import { InputDialogComponent } from './input-dialog/input-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HranaService } from '../../../services/hrana.service';
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
  hrana:Hrana[];


  constructor(public dialog: MatDialog, public hranaService: HranaService) {}
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
    this.hranaService.getFood().subscribe(hrana => {
      this.hrana = hrana;
    })
  }


}





