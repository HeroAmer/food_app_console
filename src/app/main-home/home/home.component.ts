import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ItemService } from 'src/app/services/item-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { NotificationPopupComponent } from './notification-popup/notification-popup.component';

export interface DialogData {
  uid?: string;
  phone: string;
  fullName?: string;
  orderAddress?: string;
  orderTotal?: number;
  status?: boolean;
  orderCode: string;
  orderJelo?: string;
  orderKomentar?: string;
  orderDoplata: number;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public itemService: ItemService,
    private afAuth: AuthServiceService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private afs:AngularFirestore,
    public dialog: MatDialog
  ) {}
  notifications;
  numberOfNotifications;
  numberOfOrders = 0 ;


  iD:string;
  numberOfSeen;
  userEmail;
  role:string;
  userFullname:string;

  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;
  userDetails:Employee;
  showPostavke = false;

  ngOnInit(): void {

    console.log('Hey');
    this.povuciNotifikacije();
    // this.notifications = this.itemService
    //   .getNotifikacije()
    //   .subscribe((notifikacije) => {
    //     this.notifications = notifikacije;
    //     this.numberOfOrders = notifikacije.length;
    //     console.log('Number of orders' , this.numberOfOrders)
    //   });


    this.afAuth.getAuth().subscribe((auth) => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
        this.iD = auth.uid;
        this.afAuth.getUserDetails(this.iD);
    this.afAuth.getUser().subscribe(user =>{
      this.role=user[0].role;
      this.numberOfSeen= user[0].seenNotifications;
      this.userEmail = user[0].email;
      console.log(this.userEmail);
      this.userFullname = user[0].fullname;
      console.log('Seen notifications: ' +this.numberOfSeen)
      console.log(user[0].role);
      if(this.role == 'vlasnik'){
        this.showPostavke = true;
        console.log('lalalall');
      }

    })
      } else {
        this.isLoggedIn = false;
      }
    });



    // this.afAuth.juzer$.subscribe(juzer => this.juzer = juzer);
    // console.log(this.juzer);

  }

  onLogoutClick(uid ,numberOfNotifications, userEmail, userFullname ,role) {
    this.afAuth.logout(uid ,numberOfNotifications, userEmail, userFullname,role);
    this.flashMessage.show(`You are now <strong>logged out!</strong>`, {
      cssClass: 'alert alert-info',
      timeout: 4000,
    });
    this.router.navigate(['/']);
  }

  otvoriDetalje(code, jelo, komentar, name, adresa, orderphone, doplata, suma){
    const dialogRef = this.dialog.open(NotificationPopupComponent, {
      data:{
        orderCode:code,
        orderJelo:jelo,
        orderKomentar:komentar,
        fullName:name,
        orderAddress:adresa,
        phone:orderphone,
        orderDoplata:doplata,
        orderTotal:suma

      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getSeenNotifications(){
    this.numberOfSeen = this.numberOfOrders;
    this.numberOfNotifications = this.numberOfOrders - this.numberOfSeen;
  }

  povuciNotifikacije(){
    this.itemService.selectAllOrders().subscribe((notifikaije) => {
      this.notifications = notifikaije;
      this.numberOfOrders = this.notifications.length;
    })

  }

   timerId = setInterval(() => {
    this.numberOfNotifications = this.numberOfOrders - this.numberOfSeen;
   }, 2000);


   getUserDetails(){
    this.afAuth.getUserDetails(this.iD);
    this.afAuth.getUser().subscribe(user =>{
      console.log(user);

    })
   }

  // ngAfterViewInit(){
  //   (document.querySelector('.active-link') as HTMLElement).style.color{

  //   }
  // }
}
