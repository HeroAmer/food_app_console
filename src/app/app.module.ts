import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemService } from './services/item-service.service';
import { AddItemComponent } from './components/add-item/add-item.component';
import { HomeComponent } from './main-home/home/home.component';
import { HeaderComponent } from './main-home/home/header/header.component';
import { SidebarComponent } from './main-home/home/sidebar/sidebar.component';
import { NarudzbeComponent } from './main-home/home/sidebar/narudzbe/narudzbe.component';
import { NoviUnosComponent } from './main-home/home/sidebar/novi-unos/novi-unos.component';
import { PostavkeComponent } from './main-home/home/sidebar/postavke/postavke.component';

@NgModule({
  declarations: [AppComponent, ItemsComponent, AddItemComponent, HomeComponent, HeaderComponent, SidebarComponent, NarudzbeComponent, NoviUnosComponent, PostavkeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule,
  ],
  providers: [ItemService],
  bootstrap: [AppComponent],
})
export class AppModule {}
