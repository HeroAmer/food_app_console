import { Component, OnInit } from '@angular/core';
import { Narudzbe } from '../../../models/orders';
import { OrdersService } from '../../../services/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { GoogleChartInterface } from 'ng2-google-charts';
declare let google: any;

@Component({
  selector: 'app-narudzbe',
  templateUrl: './narudzbe.component.html',
  styleUrls: ['./narudzbe.component.scss'],
})
export class NarudzbeComponent implements OnInit {
  orders: Narudzbe[];
  selectedOrders = [];

  constructor(public ordersService: OrdersService, public dialog: MatDialog) {}

  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    google.charts.setOnLoadCallback(drawChartTwo);
    google.charts.setOnLoadCallback(drawChartThree);

    function drawChart() {
      let data = google.visualization.arrayToDataTable([
        ['Dani', 'Sales', 'Expenses', 'Orders'],
        ['Pon', 0, 0, 0],
        ['Uto', 1000, 300, 2000],
        ['Sri', 1170, 460, 2100],
        ['Cet', 660, 1120, 1500],
        ['Pet', 1030, 540, 1200],
        ['Sub', 2000, 540, 160],
        ['Ned', 1030, 540, 700],
      ]);
      let options: {
        titleTextStyle: {
          color: 'orange';
        };
        hAxis: {
          textStyle: { color: 'orange' };
        };
        vAxis: {
          textStyle: { color: 'orange' };
          format: 'decimal';
        };
        series: {
          0: { color: 'lightblue'; weight: 'bold'; lineWidth: 4 };
        };
        title: 'Company Performance';
        backgroundColor: 'transparent';
        height: 400;
        width: 950;
        curveType: 'function';
        legend: { position: 'bottom'; textStyle: { color: 'orange' } };
      };
      let chart = new google.visualization.LineChart(
        document.getElementById('curve_chart')
      );
      chart.draw(data, options);
      window.addEventListener('resize', drawChart, true);
    }
    function drawChartTwo() {
      var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Zavrsene', 11],
        ['Na cekanju', 2],
        ['U pripremi', 2],
  
      ]);

      var options = {
        title: 'Narudzbe o dostavi',
      };

      var chart = new google.visualization.PieChart(
        document.getElementById('piechart')
      );

      chart.draw(data, options);
      window.addEventListener('resize', drawChartTwo, true);
    }

    function drawChartThree() {
      var data = google.visualization.arrayToDataTable([
        ['Year', 'Sales', 'Expenses'],
        ['2013', 1000, 400],
        ['2014', 1170, 460],
        ['2015', 660, 1120],
        ['2016', 1030, 540],
      ]);

      var options = {
        title: 'Company Performance',
        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 },
      };

      var chart = new google.visualization.AreaChart(
        document.getElementById('areachart')
      );
      chart.draw(data, options);
      window.addEventListener('resize', drawChartThree, true);
    }
  }

  // public lineChart: GoogleChartInterface = {
  //   chartType: 'LineChart',
  //   dataTable: [
  //     ['Dani', 'Sales', 'Expenses', 'orders'],
  //     ['Pon', 0, 0, 0],
  //     ['Uto', 1000, 300, 2000],
  //     ['Sri', 1170, 460, 2100],
  //     ['Cet', 660, 1120, 1500],
  //     ['Pet', 1030, 540, 1200],
  //     ['Sub', 2000, 540, 160],
  //     ['Ned', 1030, 540, 700],
  //   ],
  //   options: {
  //     titleTextStyle: {
  //       color: 'orange',
  //     },
  //     hAxis: {
  //       textStyle: { color: 'orange' },
  //     },
  //     vAxis: {
  //       textStyle: { color: 'orange' },
  //     },
  //     series: {
  //       0: { color: 'lightblue', weight: 'bold', lineWidth: 4 },
  //     },
  //     title: 'Company Performance',
  //     backgroundColor: 'transparent',
  //     height: 400,
  //     width: 550,
  //     curveType: 'function',
  //     legend: { position: 'bottom', textStyle: { color: 'orange' } },
  //   },
  // };

  // public pieChart: GoogleChartInterface = {
  //   chartType: 'PieChart',
  //   dataTable: [
  //     ['Status', 'Broj narudzbi'],
  //     ['Zavrsene', 17],
  //     ['Cekanje', 30],
  //     ['Spremne', 20],
  //   ],
  //   options: {
  //     titleTextStyle: {
  //       color: 'orange',
  //     },
  //     hAxis: {
  //       textStyle: { color: 'lightblue' },
  //     },
  //     legend: {
  //       textStyle: { color: 'orange' },
  //     },
  //     title: 'Narudzbe',
  //     height: 300,
  //     backgroundColor: 'transparent',
  //     width: 400,
  //     pieHole: 0.4,
  //     slices: {
  //       0: { offset: 0.2, color: 'lightgreen' },
  //     },
  //   },
  // };

  // public barChart: GoogleChartInterface = {
  //   chartType: 'BarChart',
  //   dataTable: [
  //     ['Element', 'Density', { role: 'style' }],
  //     ['Copper', 8.94, '#b87333'], // RGB value
  //     ['Silver', 10.49, 'silver'], // English color name
  //     ['Gold', 19.3, 'gold'],
  //     ['Platinum', 21.45, 'color: #e5e4e2'], // CSS-style declaration
  //   ],
  //   options: {
  //     titleTextStyle: {
  //       color: 'orange',
  //     },
  //     vAxis: {
  //       textStyle: { color: 'orange' },
  //     },
  //     hAxis: {
  //       textStyle: { color: 'orange' },
  //     },
  //     title: 'Elements statistics',
  //     backgroundColor: 'transparent',
  //     height: 300,
  //     width: 500,
  //     curveType: 'function',
  //     legend: { position: 'none' },
  //   },
  // };

  // public areaChart: GoogleChartInterface = {
  //   chartType: 'AreaChart',
  //   dataTable: [
  //     ['Year', 'Sales', 'Expenses'],
  //     ['2013', 1000, 400],
  //     ['2014', 1170, 460],
  //     ['2015', 660, 1120],
  //     ['2016', 1030, 540],
  //   ],
  //   options: {
  //     title: 'Sales last few years',
  //     titleTextStyle: {
  //       color: 'orange',
  //     },
  //     hAxis: { title: 'Year', textStyle: { color: 'orange' } },
  //     vAxis: { minValue: 0, textStyle: { color: 'orange' } },
  //     backgroundColor: 'transparent',
  //     height: 300,
  //     width: 500,
  //     legend: {
  //       position: 'none',
  //       textStyle: { color: 'orange' },
  //     },
  //   },
  // };

  // cl() {
  //   alert('User has been edited!');
  // }

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
