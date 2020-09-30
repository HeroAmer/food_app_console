import {AfterViewInit, Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { InputDialogComponent } from './input-dialog/input-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HranaService } from '../../../services/hrana.service';
import { Hrana } from '../../../models/hrana-unos';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-novi-unos',
  templateUrl: './novi-unos.component.html',
  styleUrls: ['./novi-unos.component.scss'],
})
export class NoviUnosComponent implements OnInit {
  displayedColumns: string[] = ['position','naziv', 'opis', 'cijena'];
  food =[];
  dataSource = new MatTableDataSource<Hrana>(this.food);

  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(public dialog: MatDialog, public foodService: HranaService,private cdr: ChangeDetectorRef) {

  }




  openDialog() {
    const dialogRef = this.dialog.open(InputDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.foodService.getFood().subscribe(data => {
      this.food = data;
      this.dataSource.data = this.food;
      this.dataSource.paginator = this.paginator;
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}





