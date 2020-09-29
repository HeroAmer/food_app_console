import { isDataSource } from '@angular/cdk/collections';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Component, HostBinding , Inject, OnInit, Renderer2 } from '@angular/core';
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

  constructor( private firestore: AngularFirestore,public itemService:ItemService, @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {

  }

  ngOnInit(){
    this.itemService.getNewMode().subscribe(newMode =>{
      this.isDark = newMode;
    const hostClass = this.isDark ? 'dark-mode' : 'light-mode';
    this.renderer.setAttribute(this.document.body, 'class', hostClass);
    })
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
