import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

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
import { NarudzbeComponent } from './main-home/home/narudzbe/narudzbe.component';
import { NoviUnosComponent } from './main-home/home/novi-unos/novi-unos.component';
import { PostavkeComponent } from './main-home/home/postavke/postavke.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputDialogComponent } from './main-home/home/novi-unos/input-dialog/input-dialog.component';
import { OrderDetailsComponent } from './main-home/home/narudzbe/order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    AddItemComponent,
    HomeComponent,
    NarudzbeComponent,
    NoviUnosComponent,
    PostavkeComponent,
    InputDialogComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  providers: [ItemService],
  bootstrap: [AppComponent],
  entryComponents: [InputDialogComponent, OrderDetailsComponent],
})
export class AppModule {}
