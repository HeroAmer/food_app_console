import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { Narudzbe } from '../../../models/orders';
import { OrdersService } from '../../../services/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from './order-details/order-details.component';

@Component({
  selector: 'app-narudzbe',
  templateUrl: './narudzbe.component.html',
  styleUrls: ['./narudzbe.component.css'],
})
export class NarudzbeComponent implements OnInit {
  orders: Narudzbe[];

  selectedOrders = [];

  danasnjeNarudzbe;
  jucerasnjeNarudzbe;
  threeDaysAgoOrders;
  fourDaysAgoOrders;
  fiveDaysAgoOrders;
  sixDaysAgoOrders;
  sevenDaysAgoOrders;

/// Računanje datuma za posljednjih 7 dana
  // today = new Date().toLocaleDateString('en-GB');
  // yesterday = new Date(Date.now() - 864e5).toLocaleDateString('en-GB');
  // threeDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toLocaleDateString(
  //   'en-GB'
  // );
  // fourDaysAgo = new Date(Date.now() - 64 * 60 * 60 * 1000).toLocaleDateString(
  //   'en-GB'
  // );
  // fiveDaysAgo = new Date(Date.now() - 96 * 60 * 60 * 1000).toLocaleDateString(
  //   'en-GB'
  // );
  // sixDaysAgo = new Date(Date.now() - 120 * 60 * 60 * 1000).toLocaleDateString(
  //   'en-GB'
  // );
  // sevenDaysAgo = new Date(Date.now() - 148 * 60 * 60 * 1000).toLocaleDateString(
  //   'en-GB'
  // );


  constructor(
    // public itemService: ItemService,
    public ordersService: OrdersService,
    public dialog: MatDialog) {}

  cl() {
    alert('User has been edited!');
  }

  ngOnInit(): void {
    this.povuciNarudzbe();
  }

  ///Funkcija koja se poziva pri loadanju komponente (onInit) i povlaci narudzbe
  povuciNarudzbe() {
    // this.ordersService.selectAllOrders().subscribe((orders) => {
    //   this.orders = orders;
    //   var today = new Date().toLocaleDateString('en-GB');
    //   let yesterday = new Date(Date.now() - 864e5).toLocaleDateString('en-GB');
    //   console.log(today);
    //   let threeDaysAgo = this.threeDaysAgo;
    //   let fourDaysAgo = this.fourDaysAgo;
    //   let fiveDaysAgo = this.fiveDaysAgo;
    //   let sixDaysAgo = this.sixDaysAgo;
    //   let sevenDaysAgo = this.sevenDaysAgo;

    //   ///Niz narudzbi koje su napravljenje danas
    //   let arrayOfOrdersToday = [];
    //   let arrayOfOrdersYesterday = [];
    //   let threeDaysAgoOrders = [];
    //   let fourDaysAgoOrders = [];
    //   let fiveDaysAgoOrders = [];
    //   let sixDaysAgoOrders = [];
    //   let sevenDaysAgoOrders = [];

    //   /// Provjera narudzbi za danas
    //   orders.forEach((narudzba) => {
    //     let todayOrdersDate = narudzba.datum.toString();
    //     if(todayOrdersDate.startsWith(today)){
    //       arrayOfOrdersToday.push(narudzba);
    //     }
    //   });

    //   ///Provjera narudzbi za jucer
    //   orders.forEach((jucer) => {
    //     let yesterdaysOrdersDate = jucer.datum.toString();
    //     if(yesterdaysOrdersDate.startsWith(yesterday)){
    //       arrayOfOrdersYesterday.push(jucer);
    //     }
    //   });

    //   ///Provjera za prekjucer
    //   orders.forEach((prekjucer) => {
    //     let threeDaysAgoDate = prekjucer.datum.toString();
    //     if(threeDaysAgoDate.startsWith(threeDaysAgo)){
    //       threeDaysAgoOrders.push(prekjucer);
    //     }
    //   });
    //   ///Provjera za prije 4 dana
    //   orders.forEach((prijeCetriDana) => {
    //     let fourDaysAgoDate = prijeCetriDana.datum.toString();
    //     if(fourDaysAgoDate.startsWith(fourDaysAgo)){
    //       fourDaysAgoOrders.push(prijeCetriDana);
    //     }
    //   });

    //   ///Provjera za prije 5 dana
    //   orders.forEach((prijePetDana) => {
    //     let fiveDaysAgoDate = prijePetDana.datum.toString();
    //     if(fiveDaysAgoDate.startsWith(fiveDaysAgo)){
    //       fiveDaysAgoOrders.push(prijePetDana);
    //     }
    //   });

    //   ///Provjera za prije 6 dana
    //   orders.forEach((prijeSestDana) => {
    //     let sixDaysAgoDate = prijeSestDana.datum.toString();
    //     if(sixDaysAgoDate.startsWith(sixDaysAgo)){
    //       sixDaysAgoOrders.push(prijeSestDana);
    //     }
    //   });

    //   ///Provjera za prije 7 dana
    //   orders.forEach((prijeSedamDana) => {
    //     let sevenDaysAgoDate = prijeSedamDana.datum.toString();
    //     if(sevenDaysAgoDate.startsWith(sevenDaysAgo)){
    //       sevenDaysAgoOrders.push(prijeSedamDana);
    //     }
    //   });

    //   ///Uzimamo duzinu niza narudzbi koje su napravljene danas da bi mogli prikazati na grafikonu
    //   this.danasnjeNarudzbe = arrayOfOrdersToday.length;
    //   this.jucerasnjeNarudzbe = arrayOfOrdersYesterday.length;
    //   this.threeDaysAgoOrders = threeDaysAgoOrders.length;
    //   this.fourDaysAgoOrders = fourDaysAgoOrders.length;
    //   this.fiveDaysAgoOrders = fiveDaysAgoOrders.length;
    //   this.sixDaysAgoOrders = sixDaysAgoOrders.length;
    //   this.sevenDaysAgoOrders = sevenDaysAgoOrders.length;
    //   this.napraviChart();
    // });
  }


  onChangeInput(event, orderId, i){
    if(event.target.checked){
      this.selectedOrders.splice(i, 0 ,orderId);
      console.log(this.selectedOrders);
      // console.log(i);
      // this.selectedOrders.push(orderId);
      // console.log(this.selectedOrders);
    }else{
      this.selectedOrders.splice(i, 1);
      console.log(this.selectedOrders);
    }
  }

  zavrsiMultipleOrders(selectedOrders){
    this.ordersService.zavrsiMultiple(selectedOrders);
  }

  ///Funkcija koja se poziva kada zelimo napraviti chart (pir loadanju komponente, ili primanja novih vrijednosti)
  napraviChart() {
    var ctx = 'myChart';
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7
        ],
        datasets: [
          {
            data: [
              this.sevenDaysAgoOrders,
              this.sixDaysAgoOrders,
              this.fiveDaysAgoOrders,
              this.fourDaysAgoOrders,
              this.threeDaysAgoOrders,
              this.jucerasnjeNarudzbe,
              this.danasnjeNarudzbe,
            ],
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

    this.ordersService.selectAllOrders().subscribe((orders) => {
      console.log(orders);
      this.orders = orders;
    });
  }
  openDetails(code, jelo, komentar, name, adresa, orderphone, doplata, suma, narudzba_id) {
    const dialogRef = this.dialog.open(OrderDetailsComponent, {
      data: {
        orderCode: code,
        orderJelo: jelo,
        orderKomentar: komentar,
        fullName: name,
        orderAddress: adresa,
        phone: orderphone,
        orderDoplata: doplata,
        orderTotal: suma,
        narudzba_id:narudzba_id
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
