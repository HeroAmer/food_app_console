import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Kategorija } from 'src/app/models/kategorija';
import { ItemService } from 'src/app/services/item-service.service';

@Component({
  selector: 'app-nova-kategorija',
  templateUrl: './nova-kategorija.component.html',
  styleUrls: ['./nova-kategorija.component.css']
})
export class NovaKategorijaComponent implements OnInit {

  category:Kategorija = {
    nazivKategorije:'',
    katID:''
  }

  constructor( private itemService:ItemService) { }


  ngOnInit(): void {
  }

  kreirajKategoriju(){
    this.itemService.addKategorija(this.category);
  }
}
