import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NovaKategorijaComponent } from './nova-kategorija/nova-kategorija.component';
import { Kategorija } from '../../../models/kategorija';
import { KategorijeService } from 'src/app/services/kategorije.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kategorije',
  templateUrl: './kategorije.component.html',
  styleUrls: ['./kategorije.component.scss'],
})
export class KategorijeComponent implements OnInit {
  categories: Kategorija[];

  constructor(
    public dialog: MatDialog,
    private categoriesService: KategorijeService
  ) {}
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
  }
  openDialog() {
    const dialogRef = this.dialog.open(NovaKategorijaComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  cl() {
    alert('User has been edited!');
  }

  ngOnInit(): void {
    this.categoriesService.getKategorije().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
