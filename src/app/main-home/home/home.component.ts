import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public itemService: ItemService) {}
  notifications;
  numberOfNotifications;

  ngOnInit(): void {
    this.notifications = this.itemService.getNotifikacije().subscribe(notifikacije =>{
      this.notifications = notifikacije;
      this.numberOfNotifications = notifikacije.length;
    })
  }

  // ngAfterViewInit(){
  //   (document.querySelector('.active-link') as HTMLElement).style.color{

  //   }
  // }
}
