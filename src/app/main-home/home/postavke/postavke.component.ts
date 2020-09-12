import { Component, OnInit } from '@angular/core';


export interface PeriodicElement {
  image: string;
  name: string;
  pozicija: string;
  phone_number: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    image: 'Slika',
    name: 'Elvir Halilovic',
    pozicija: 'Vlasnik',
    phone_number: 3876044351,
  },
  {
    image: 'Slika',
    name: 'Arslan Ducic',
    pozicija: 'Menadzer',
    phone_number: 3876000221,
  },
  {
    image: 'Slika',
    name: 'Amer Hero',
    pozicija: 'Glupan',
    phone_number: 3876223351,
  },
];

@Component({
  selector: 'app-postavke',
  templateUrl: './postavke.component.html',
  styleUrls: ['./postavke.component.css']
})
export class PostavkeComponent implements OnInit {

  displayedColumns: string[] = ['image', 'Ime', 'Pozicija', 'Broj telefona', 'execute'];
  dataSource = ELEMENT_DATA;

  constructor() {}
  cl() {
    alert('User has been edited!');
  }



  ngOnInit(): void {
  }

}
