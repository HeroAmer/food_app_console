import { Component, OnInit } from '@angular/core';
import { Narudzbe } from '../../../models/orders';
import { OrdersService } from '../../../services/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-narudzbe',
  templateUrl: './narudzbe.component.html',
  styleUrls: ['./narudzbe.component.scss'],
})
export class NarudzbeComponent implements OnInit {
  orders: Narudzbe[];
  selectedOrders = [];

  public lineChart: GoogleChartInterface = {
    chartType: 'LineChart',
    dataTable: [
      ['Dani', 'Sales', 'Expenses', 'orders'],
      ['Pon', 0, 0, 0],
      ['Uto', 1000, 300, 2000],
      ['Sri', 1170, 460, 2100],
      ['Cet', 660, 1120, 1500],
      ['Pet', 1030, 540, 1200],
      ['Sub', 2000, 540, 160],
      ['Ned', 1030, 540, 700],
    ],
    options: {
      titleTextStyle: {
       color: 'orange'
      },
      hAxis: {
    textStyle:{color: 'orange'}
},
      vAxis: {
    textStyle:{color: 'orange'}
},
      series: {
        0: { color: 'lightblue', weight: 'bold', lineWidth: 4 },
      },
      title: 'Company Performance',
      backgroundColor: 'transparent',
      height: 300,
      width: 500,
      curveType: 'function',
      legend: { position: 'bottom' },
    },
  };
  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [
      ['Status', 'Broj narudzbi'],
      ['Zavrsene', 17],
      ['Cekanje', 30],
      ['Spremne', 20],
    ],
    options: {
       titleTextStyle: {
       color: 'orange'
      },
      hAxis: {
    textStyle:{color: 'lightblue'}},
      legend: {
        textStyle: { color: 'orange' }},
      title: 'Narudzbe',
      height: 300,
      backgroundColor: 'transparent',
      width: 400,
      pieHole: 0.4,
      slices: {
        0: { offset: 0.2, color: 'lightgreen' },
      },
    },
  };

   public barChart: GoogleChartInterface = {
    chartType: 'BarChart',
    dataTable:[
         ['Element', 'Density', { role: 'style' }],
         ['Copper', 8.94, '#b87333'],            // RGB value
         ['Silver', 10.49, 'silver'],            // English color name
         ['Gold', 19.30, 'gold'],
         ['Platinum', 21.45, 'color: #e5e4e2' ], // CSS-style declaration
      ],
    options: {
      titleTextStyle: {
       color: 'orange'
      },
      vAxis: {
    textStyle:{color: 'orange'}
      },
      hAxis: {
    textStyle:{color: 'orange'}
      },
      title: 'Elements statistics',
      backgroundColor: 'transparent',
      height: 300,
      width: 500,
      curveType: 'function',
      legend: { position: 'bottom' , color:'orange'},
    },
  };

   public areaChart: GoogleChartInterface = {
    chartType: 'AreaChart',
    dataTable: [
          ['Year', 'Sales', 'Expenses'],
          ['2013',  1000,      400],
          ['2014',  1170,      460],
          ['2015',  660,       1120],
          ['2016',  1030,      540]
        ],
    options: {

          title: 'Sales last few years',
          titleTextStyle: {
       color: 'orange'
      },
          hAxis: {title: 'Year',  textStyle: {color: 'orange'}},
          vAxis: {minValue: 0, textStyle: {color: 'orange'}},
      backgroundColor: 'transparent',
      height: 300,
      width: 500,
      legend: {
        textStyle: { color: 'orange' }},
        },
  };

  constructor(public ordersService: OrdersService, public dialog: MatDialog) {}

  cl() {
    alert('User has been edited!');
  }

  ngOnInit(): void {}

  onChangeInput(event, orderId, i) {
    if (event.target.checked) {
      this.selectedOrders.splice(i, 0, orderId);
      console.log(this.selectedOrders);
    } else {
      this.selectedOrders.splice(i, 1);
      console.log(this.selectedOrders);
    }
  }

  zavrsiMultipleOrders(selectedOrders) {
    this.ordersService.zavrsiMultiple(selectedOrders);
  }

  ///Funkcija koja se poziva kada zelimo napraviti chart (pir loadanju komponente, ili primanja novih vrijednosti)

  openDetails(
    code,
    jelo,
    komentar,
    name,
    adresa,
    orderphone,
    doplata,
    suma,
    narudzba_id
  ) {
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
        narudzba_id: narudzba_id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
