import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NovaKategorijaComponent } from './nova-kategorija/nova-kategorija.component';
import  {Kategorija} from '../../../models/kategorija';
import { ItemService } from 'src/app/services/item-service.service';


@Component({
  selector: 'app-kategorije',
  templateUrl: './kategorije.component.html',
  styleUrls: ['./kategorije.component.css']
})
export class KategorijeComponent implements OnInit {
  kategorije:Kategorija[];

  constructor(public dialog: MatDialog , private itemService : ItemService) { }
  openDialog() {
    const dialogRef = this.dialog.open(NovaKategorijaComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  cl() {
    alert('User has been edited!');
  }

  ngOnInit(): void {
    this.itemService.getKategorije().subscribe(kategorije => {
      this.kategorije = kategorije;
    })
  }

}
