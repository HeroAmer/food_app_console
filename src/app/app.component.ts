import { Component, HostBinding , OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ItemService } from './services/item-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'food-app-console';
  description = 'Angular-Zeljo';
  darkMode = false;
  isDark = false;

  @HostBinding('class')
  get themeMode() {
    return this.isDark ? 'dark-mode' : 'light-mode';
  }

  constructor( private firestore: AngularFirestore,public itemService:ItemService ) {}

  ngOnInit(){
    this.itemService.getNewMode().subscribe(newMode =>{
      this.isDark = newMode;
    })
  }




  getDark(){
   this.darkMode =  this.itemService.getMode();
    this.isDark = this.darkMode;
  }
  exampleCreate(data){
    return new Promise<any>((resolve, reject) => {
       this.firestore
           .collection("collectionNameHere")
           .add(data)
           .then(
               res => {},
               err => reject(err)
           )
    }
 )}
}
