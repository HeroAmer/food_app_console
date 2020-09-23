import { Component, OnInit } from '@angular/core';
import { InputDialogComponent } from './input-dialog/input-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HranaService } from '../../../services/hrana.service';
import { Hrana } from '../../../models/hrana-unos';


@Component({
  selector: 'app-novi-unos',
  templateUrl: './novi-unos.component.html',
  styleUrls: ['./novi-unos.component.css'],
})
export class NoviUnosComponent implements OnInit {

  hrana:Hrana[];

  constructor(public dialog: MatDialog, public hranaService: HranaService) {}
  openDialog() {
    const dialogRef = this.dialog.open(InputDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.hranaService.getFood().subscribe(hrana => {
      this.hrana = hrana;
    })
  }


}





