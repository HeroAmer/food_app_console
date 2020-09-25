import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders.service';
import { DialogData } from "../OrderDetailsData";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData  , private ordersService: OrdersService) {}

  ngOnInit(): void {
    console.log(this.data)
  }

  zavrsiNarudzbu(narudzba_id){
    this.ordersService.zavrsiNarudzbu(narudzba_id);
  }
}
