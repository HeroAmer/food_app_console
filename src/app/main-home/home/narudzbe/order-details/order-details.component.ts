import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item-service.service';
import { DialogData } from '../narudzbe.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData , public itemService: ItemService) {}

  ngOnInit(): void {
    console.log(this.data)
  }

  zavrsiNarudzbu(narudzba_id){
    this.itemService.zavrsiNarudzbu(narudzba_id);
  }
}
