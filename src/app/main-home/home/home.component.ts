import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ItemService } from 'src/app/services/item-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

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
    private flashMessage: FlashMessagesService
  ) {}
  notifications;
  numberOfNotifications;
  numberOfOrders = 0 ;
  numberOfSeen = 0;
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  ngOnInit(): void {
    this.notifications = this.itemService
      .getNotifikacije()
      .subscribe((notifikacije) => {
        this.notifications = notifikacije;
        this.numberOfOrders = notifikacije.length;
        console.log('Number of orders' , this.numberOfOrders)
      });
    this.afAuth.getAuth().subscribe((auth) => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });

  }
  onLogoutClick() {
    this.afAuth.logout();
    this.flashMessage.show(`You are now <strong>logged out!</strong>`, {
      cssClass: 'alert alert-info',
      timeout: 4000,
    });
    this.router.navigate(['/']);
  }

  getSeenNotifications(){
    this.numberOfSeen = this.numberOfOrders;
    this.numberOfNotifications = this.numberOfOrders - this.numberOfSeen;
  }

   timerId = setInterval(() => {
    this.numberOfNotifications = this.numberOfOrders - this.numberOfSeen;
    console.log('number of seen notifications', this.numberOfSeen);
   }, 2000);


  // ngAfterViewInit(){
  //   (document.querySelector('.active-link') as HTMLElement).style.color{

  //   }
  // }
}
