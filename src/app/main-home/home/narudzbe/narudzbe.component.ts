import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { ViewChild } from '@angular/core'

@Component({
  selector: 'app-narudzbe',
  templateUrl: './narudzbe.component.html',
  styleUrls: ['./narudzbe.component.css']
})
export class NarudzbeComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    var ctx = 'myChart';
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7],
    datasets: [{
        data: [2,8,3,6,3,10],
        label: "Broj narudzbi",
        borderColor: "#3e95cd",
        fill: false
      },
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Po danima'
    },
    scales: {
      yAxes: [{
          ticks: {
              display: false
          }
      }]
  }
  }
});
 }


}
