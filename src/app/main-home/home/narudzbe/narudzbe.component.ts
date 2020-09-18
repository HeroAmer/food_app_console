import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { ViewChild } from '@angular/core';
import { Narudzbe } from '../../../models/orders';
import { ItemService } from '../../../services/item-service.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from './order-details/order-details.component';

export interface DialogData {
  uid?: string;
  phone: string;
  fullName?: string;
  orderAddress?: string;
  orderTotal?: number;
  status?: boolean;
  orderCode: string;
  orderJelo?: string;
  orderKomentar?: string;
  orderDoplata: number;
}

@Component({
  selector: 'app-narudzbe',
  templateUrl: './narudzbe.component.html',
  styleUrls: ['./narudzbe.component.css'],
})
export class NarudzbeComponent implements OnInit {
  orderItem: Narudzbe[];
  danasnjeNarudzbe;
  today = new Date().toLocaleDateString('en-GB');

  yesterday = new Date(Date.now() - 864e5).toLocaleDateString('en-GB');


  constructor(public itemService: ItemService, public dialog: MatDialog) {}

  cl() {
    alert('User has been edited!');
  }

  ngOnInit(): void {
       this.povuciNarudzbe();
       console.log('Yesterday was ' + this.yesterday);
      }

  openDetails(code, jelo, komentar, name, adresa, orderphone, doplata, suma) {
    const dialogRef = this.dialog.open(OrderDetailsComponent, {
      data: {
        orderCode: code,
        orderJelo: jelo,
        orderKomentar: komentar,
        fullName: name,
        orderAddress: adresa,
        phone: orderphone,
        orderDoplata: doplata,
        orderTotal: suma
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

///Funkcija koja se poziva pri loadanju komponente (onInit) i povlaci narudzbe
  povuciNarudzbe(){
    this.itemService.selectAllOrders().subscribe((orderItem) => {
      console.log(orderItem);
      this.orderItem = orderItem;
      var today = new Date().toLocaleDateString('en-GB');
      console.log(today);

      ///Niz narudzbi koje su napravljenje danas
      let arrayOfOrdersToday = [];
      orderItem.forEach(narudzba => {
          if(narudzba.datum == today){
            console.log("NOVAA")
            arrayOfOrdersToday.push(narudzba);
          }
      });
      console.log(arrayOfOrdersToday.length);
      ///Uzimamo duzinu niza narudzbi koje su napravljene danas da bi mogli prikazati na grafikonu
      this.danasnjeNarudzbe = arrayOfOrdersToday.length;
      this.napraviChart();
    });
  }


///Funkcija koja se poziva kada zelimo napraviti chart (pir loadanju komponente, ili primanja novih vrijednosti)
  napraviChart() {
    var ctx = 'myChart';
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [1, 2, 3, 4, 6, this.today ],
        datasets: [
          {
            data: [0, 8, 3, 3, 3, this.danasnjeNarudzbe],
            label: 'Broj narudzbi',
            borderColor: '#3e95cd',
            fill: false,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: 'Po danima',
        },
        scales: {
          yAxes: [
            {
              ticks: {
                display: false,
              },
            },
          ],
        },
      },
    });
  }
}
