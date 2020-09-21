import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { RegisterPopupComponent } from './register-popup/register-popup.component';


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
  styleUrls: ['./postavke.component.css'],
})
export class PostavkeComponent implements OnInit {
  employees:Employee[];
  displayedColumns: string[] = [
    'image',
    'Ime',
    'Pozicija',
    'Broj telefona',
    'execute',
  ];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog , private authService: AuthServiceService) {}
  openDialog() {
    const dialogRef = this.dialog.open(RegisterPopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  cl() {
    alert('User has been edited!');
  }

  ngOnInit(): void {
    console.log('postavke')
    this.authService.getEmployees().subscribe(uposlenici => {
      this.employees = uposlenici;
      console.log(uposlenici);
    })
  }
}
