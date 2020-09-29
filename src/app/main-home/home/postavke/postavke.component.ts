import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { RegisterPopupComponent } from './register-popup/register-popup.component';


@Component({
  selector: 'app-postavke',
  templateUrl: './postavke.component.html',
  styleUrls: ['./postavke.component.scss'],
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
