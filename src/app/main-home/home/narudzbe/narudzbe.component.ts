import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { ViewChild } from '@angular/core';
import {Narudzbe} from '../../../models/orders';
import {ItemService} from '../../../services/item-service.service';

@Component({
  selector: 'app-narudzbe',
  templateUrl: './narudzbe.component.html',
  styleUrls: ['./narudzbe.component.css'],
})
export class NarudzbeComponent implements OnInit {
  orderItem: Narudzbe[];
  constructor(public itemService: ItemService) {}

  cl() {
    alert('User has been edited!');
  }

  ngOnInit(): void {
    var ctx = 'myChart';
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7],
        datasets: [
          {
            data: [2, 8, 3, 6, 3, 10],
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

    this.itemService.selectAllOrders().subscribe((orderItem) =>{
      console.log(orderItem);
      this.orderItem = orderItem;
    })
  }
}
