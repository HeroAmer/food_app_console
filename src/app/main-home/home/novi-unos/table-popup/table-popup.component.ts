import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupData } from '../novi-unos.component';

@Component({
  selector: 'app-table-popup',
  templateUrl: './table-popup.component.html',
  styleUrls: ['./table-popup.component.scss'],
})
export class TablePopupComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: PopupData) {}
  ngOnInit(): void {
    console.log(this.data)
  }
}
