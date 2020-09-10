import { Component, OnInit } from '@angular/core';
import { InputDialogComponent } from './input-dialog/input-dialog.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-novi-unos',
  templateUrl: './novi-unos.component.html',
  styleUrls: ['./novi-unos.component.css']
})
export class NoviUnosComponent implements OnInit {

  constructor(public dialog: MatDialog) {}


  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(InputDialogComponent,{

    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  };



}
