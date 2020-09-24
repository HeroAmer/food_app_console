import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { Narudzbe } from '../../../models/orders';
import { OrdersService } from '../../../services/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';

@Component({
  selector: 'app-narudzbe',
  templateUrl: './narudzbe.component.html',
  styleUrls: ['./narudzbe.component.css'],
})
export class NarudzbeComponent implements OnInit {
  orders: Narudzbe[];
  selectedOrders = [];


  constructor(
    public ordersService: OrdersService,
    public dialog: MatDialog) {}

  cl() {
    alert('User has been edited!');
  }

  ngOnInit(): void {
    this.napraviChart();
    this.generateCircularChart();
  }

  onChangeInput(event, orderId, i){
    if(event.target.checked){
      this.selectedOrders.splice(i, 0 ,orderId);
      console.log(this.selectedOrders);
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
        labels: [-1, 2, 3, 4, 5, 6, 7
        ],
        datasets: [
          {
            data: [-2,-5,4,-5,6,3,2
            ],
            label: 'Broj narudzbi',
            borderWidth:6,
            hoverBackgroundColor:'gray',
            borderColor: '#3e95cd',
            fill: false,
          },
          {
            data: [-2,2,4,4,6,3,1
            ],
            label: 'Broj završenih narudzbi',
            borderColor: 'lightgreen',
            fill: true,
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
                display: true,
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

  generateCircularChart(){
    var ctx = 'myCircularChart';
    var myPieChart = new Chart(ctx, {
      type: 'doughnut',
      data:  {
        datasets: [{
            data: [45, 21],
            backgroundColor:['#3e95cd','#DCDCDC'],
            borderWidth:0.5,
            cutoutPercentage:90
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Završene',
            'Na čekanju',
        ]
    },
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
