import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { InputDialogComponent } from './input-dialog/input-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HranaService } from '../../../services/hrana.service';
import { Hrana } from '../../../models/hrana-unos';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TablePopupComponent } from './table-popup/table-popup.component';
import { AngularFirestore } from '@angular/fire/firestore';

export interface PopupData {
  nazivPopup?: string;
  opisPopup?: string;
  cijenaPopup?: string;
}
@Component({
  selector: 'app-novi-unos',
  templateUrl: './novi-unos.component.html',
  styleUrls: ['./novi-unos.component.scss'],
})
export class NoviUnosComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'naziv',
    'opis',
    'cijena',
    'button',
  ];
  food = [];
  dataSource = new MatTableDataSource<Hrana>(this.food);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;



//Models for Input fields
nameValue: string;
placeValue: string;

//Data object for listing items
tableData: any[] = [];

//Save first document in snapshot of items received
firstInResponse: any = [];

//Save last document in snapshot of items received
lastInResponse: any = [];

//Keep the array of first document of previous pages
prev_strt_at: any = [];

//Maintain the count of clicks on Next Prev button
pagination_clicked_count = 0;

//Disable next and prev buttons
disable_next: boolean = false;
disable_prev: boolean = false;

constructor(
    public dialog: MatDialog,
    public foodService: HranaService,
    private cdr: ChangeDetectorRef,
    public popup: MatDialog,
    private firestore: AngularFirestore
  ) {
    this.loadItems();
  }

loadItems() {
  this.firestore
    .collection('unos_hrane', (ref) => ref.limit(5))
    .snapshotChanges()
    .subscribe(
      (response) => {
        if (!response.length) {
          console.log('No Data Available');
          return false;
        }
        console.log(this.tableData)

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
        this.firstInResponse = response[0].payload.doc;
        this.lastInResponse = response[response.length - 1].payload.doc;

        this.tableData = [];
        for (let item of response) {
          this.tableData.push(item.payload.doc.data());
          console.log(this.tableData);
        }
        console.log(this.tableData)
        this.dataSource.data = this.tableData;
      this.dataSource.paginator = this.paginator;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

        //Initialize values
        this.prev_strt_at = [];
        this.pagination_clicked_count = 0;
        this.disable_next = false;
        this.disable_prev = false;

        //Push first item to use for Previous action
        this.push_prev_startAt(this.firstInResponse);
      },
      (error) => {}
    );
}


  openPopup(naziv, opis, cijena) {
    console.log(naziv);
    const popupRef = this.popup.open(TablePopupComponent, {
      data: {
        nazivPopup: naziv,
        opisPopup: opis,
        cijenaPopup: cijena,
      },
    });
    popupRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(InputDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    // this.foodService.getFood().subscribe((data) => {
    //   this.food = data;
    //   this.dataSource.data = this.food;
    //   this.dataSource.paginator = this.paginator;
    // });
    // this.loadItems();
    console.log('uslo')
    console.log(this.tableData);
  }
  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  pageChanged(event) {
    let brojStranica = this.paginator.getNumberOfPages();
    console.log(brojStranica);
    let fetchingPageNumber = brojStranica - 1;
    console.log('Broj kada se povlace items', fetchingPageNumber);
    console.log('Nestoooo');
    if (event.previousPageIndex > event.pageIndex) {
       // back button clicked
    this.disable_prev = true;
    this.firestore
      .collection('unos_hrane', (ref) =>
        ref
          .startAt(this.get_prev_startAt())
          .endBefore(this.firstInResponse)
          .limit(5)
      )
      .get()
      .subscribe(
        (response) => {
          this.firstInResponse = response.docs[0];
          this.lastInResponse = response.docs[response.docs.length - 1];

          this.tableData = [];
          for (let item of response.docs) {
            this.tableData.push(item.data());
          }

          //Maintaing page no.
          this.pagination_clicked_count--;

          //Pop not required value in array
          this.pop_prev_startAt(this.firstInResponse);

          //Enable buttons again
          this.disable_prev = false;
          this.disable_next = false;
        },
        (error) => {
          this.disable_prev = false;
        }
      );
    } else {
      // next button clicked

      let fetchingPageNumber = brojStranica - 2;

      console.log('Fetching page number is: ', fetchingPageNumber);
      console.log('Trenutna stranica je ', event.pageIndex);
      if(fetchingPageNumber == event.pageIndex){


      console.log('prvi put');
      this.disable_next = true;
      this.firestore
        .collection('unos_hrane', (ref) =>
          ref.limit(5).startAfter(this.lastInResponse)
        )
        .get()
        .subscribe(
          (response) => {
            if (!response.docs.length) {
              this.disable_next = true;
             return;
           }

            this.firstInResponse = response.docs[0];

            this.lastInResponse = response.docs[response.docs.length - 1];
          // this.tableData = [];
           for (let item of response.docs) {
              this.tableData.push(item.data());
              console.log(this.tableData.length);
            }

            console.log('after next',this.tableData);
            this.cdr.detectChanges();
            this.pagination_clicked_count++;

            this.push_prev_startAt(this.firstInResponse);
            this.cdr.detectChanges();
            this.disable_next = false;
          },
          (error) => {
            this.disable_next = false;
          }
        );
        console.log(this.tableData.length);
      }

      this.dataSource.data = this.tableData;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();
      }

    }



    push_prev_startAt(prev_first_doc) {
      this.prev_strt_at.push(prev_first_doc);
   }

  //Remove not required document
    pop_prev_startAt(prev_first_doc) {
      this.prev_strt_at.forEach((element) => {
        if (prev_first_doc.data().id == element.data().id) {
          element = null;
        }
      });
  }

  //Return the Doc rem where previous page will startAt
  get_prev_startAt() {
    if (this.prev_strt_at.length > this.pagination_clicked_count + 1)
      this.prev_strt_at.splice(
        this.prev_strt_at.length - 2,
        this.prev_strt_at.length - 1
      );
    return this.prev_strt_at[this.pagination_clicked_count - 1];
  }


  getTableLength(){
    console.log(this.tableData)
  }

  pushajNiz(){
    this.tableData.push("nesto");
  }

}
