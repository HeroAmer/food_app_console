import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item-service.service';
import { AuthServiceService } from '../../services/auth-service.service';
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
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  ngOnInit(): void {
    this.notifications = this.itemService
      .getNotifikacije()
      .subscribe((notifikacije) => {
        this.notifications = notifikacije;
        this.numberOfNotifications = notifikacije.length;
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
    this.flashMessage.show('You are now logged out!', {
      cssClass: 'alert-success',
      timeout: 4000,
    });
    this.router.navigate(['/']);
  }

  // ngAfterViewInit(){
  //   (document.querySelector('.active-link') as HTMLElement).style.color{

  //   }
  // }
}
