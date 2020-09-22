// import { Component, OnInit } from '@angular/core';
// import {ItemService} from '../../services/item-service.service';
// import {Item} from '../../models/item';

// @Component({
//   selector: 'app-add-item',
//   templateUrl: './add-item.component.html',
//   styleUrls: ['./add-item.component.css']
// })
// export class AddItemComponent implements OnInit {
//   urlTest = 'abababab';
//   item: Item = {
//     title: '',
//     description: '',
//     url:''
//   }

//   constructor(private itemService: ItemService) { }

//   ngOnInit(): void {
//   }

//   onSubmit(){
//     this.item.url = this.urlTest;
//     if(this.item.title != '' && this.item.description != ''){
//       this.itemService.addItem(this.item);
//       this.item.title = '';
//       this.item.description = '';
//     }
//   }

// }
