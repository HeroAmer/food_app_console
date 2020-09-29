import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Employee } from 'src/app/models/employee';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ItemService } from 'src/app/services/item-service.service';
import { OrdersService } from 'src/app/services/orders.service';
import { NotificationPopupComponent } from '../notification-popup/notification-popup.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  notifications;
  numberOfNotifications;
  numberOfOrders = 0;
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;
  userDetails: Employee;
  iD: string;
  numberOfSeen;
  userEmail;
  role: string;
  userFullname: string;
  @Input()
  isDark = false;

  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>();

  constructor(
    private ordersService: OrdersService,
    private afAuth: AuthServiceService,
    private itemService: ItemService,
    public dialog: MatDialog,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
            console.log('lalalall');
          }
        });
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onDarkModeSwitched({ checked }: MatSlideToggleChange) {
    this.itemService.changeMode(checked);
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

  onLogoutClick(uid, numberOfNotifications, userEmail, userFullname, role) {
    this.afAuth.logout(
      uid,
      numberOfNotifications,
      userEmail,
      userFullname,
      role
    );
    this.flashMessage.show(`You are now <strong>logged out!</strong>`, {
      cssClass: 'alert alert-info',
      timeout: 4000,
    });
    this.router.navigate(['/']);
  }
  getSeenNotifications() {
    this.numberOfSeen = this.numberOfOrders;
    this.numberOfNotifications = this.numberOfOrders - this.numberOfSeen;
  }
  getUserDetails() {
    this.afAuth.getUserDetails(this.iD);
    this.afAuth.getUser().subscribe((user) => {
      console.log(user);
    });
  }

  otvoriDetalje(code, jelo, komentar, name, adresa, orderphone, doplata, suma) {
    const dialogRef = this.dialog.open(NotificationPopupComponent, {
      data: {
        orderCode: code,
        orderJelo: jelo,
        orderKomentar: komentar,
        fullName: name,
        orderAddress: adresa,
        phone: orderphone,
        orderDoplata: doplata,
        orderTotal: suma,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
