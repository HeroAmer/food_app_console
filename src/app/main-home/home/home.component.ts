import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ItemService } from 'src/app/services/item-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { AngularFirestore } from '@angular/fire/firestore';

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
    private afs:AngularFirestore
  ) {}
  notifications;
  numberOfNotifications;
  numberOfOrders = 0 ;
  iD:string;
  numberOfSeen = 0;
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;
  userDetails:Employee;
  role:string;
  showPostavke = false;

  ngOnInit(): void {

    console.log('Hey');
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
        this.iD = auth.uid;
        this.afAuth.getUserDetails(this.iD);
    this.afAuth.getUser().subscribe(user =>{
      this.role=user[0].role;
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
