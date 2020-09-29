import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NotifikacijeService } from 'src/app/services/notifikacije.service';
import { OrdersService } from 'src/app/services/orders.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { NotificationPopupComponent } from './notification-popup/notification-popup.component';
import { ItemService } from 'src/app/services/item-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // isDark = false;

  // @HostBinding('class')
  // get themeMode() {
  //   return this.isDark ? 'dark-mode' : '';
  // }

  // onChangeDark(event){
  // this.isDark = event.checked;
  // }

  // switchMode(isDarkMode: boolean) {
  //   console.log(isDarkMode);
  //   this.isDark = isDarkMode;
  // }

  constructor(
    private ordersService: OrdersService,
    private afAuth: AuthServiceService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private afs: AngularFirestore,
    public dialog: MatDialog,
    public itemService : ItemService
  ) {}
  notifications;
  numberOfNotifications;
  numberOfOrders = 0;

  iD: string;
  numberOfSeen;
  userEmail;
  role: string;
  userFullname: string;

  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;
  userDetails: Employee;
  showPostavke = false;
  currentMode;

  ngOnInit(): void {
    console.log('Hey');
    // this.isDark = this.itemService.getMode();
    // console.log(this.isDark);
    this.povuciNotifikacije();

    this.afAuth.getAuth().subscribe((auth) => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
        this.iD = auth.uid;
        this.afAuth.getUserDetails(this.iD);
        this.afAuth.getUser().subscribe((user) => {
          this.role = user[0].role;
          this.numberOfSeen = user[0].seenNotifications;
          this.userEmail = user[0].email;
          console.log(this.userEmail);
          this.userFullname = user[0].fullname;
          console.log('Seen notifications: ' + this.numberOfSeen);
          console.log(user[0].role);
          if (this.role == 'vlasnik') {
            this.showPostavke = true;
            console.log('lalalall');
          }
        });
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onChangeTheme(event) {}

  getSeenNotifications() {
    this.numberOfSeen = this.numberOfOrders;
    this.numberOfNotifications = this.numberOfOrders - this.numberOfSeen;
  }

  povuciNotifikacije() {
    this.ordersService.selectAllOrders().subscribe((notifikaije) => {
      this.notifications = notifikaije;
      this.numberOfOrders = this.notifications.length;
    });
  }

  timerId = setInterval(() => {
    this.numberOfNotifications = this.numberOfOrders - this.numberOfSeen;
  }, 2000);

  getUserDetails() {
    this.afAuth.getUserDetails(this.iD);
    this.afAuth.getUser().subscribe((user) => {
      console.log(user);
    });
  }
}
