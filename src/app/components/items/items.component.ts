import { Component, OnInit } from '@angular/core';
import { ItemServiceService } from '../../services/item-service.service';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items;

  constructor(public itemService:ItemServiceService) { }

  ngOnInit(){
    this.itemService.getItems().subscribe(items =>{
      console.log(items);
      this.items = items;
    })
  }
}
