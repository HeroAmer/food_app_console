import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main-home/home/home.component';
import { NarudzbeComponent } from './main-home/home/narudzbe/narudzbe.component';
import { NoviUnosComponent } from './main-home/home/novi-unos/novi-unos.component';
import { PostavkeComponent } from './main-home/home/postavke/postavke.component';
import { LoginComponent } from './main-home/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  // TODO: Pokusati sa rijesenjem lazyLoadinga zbog ucitvanja ngModela (ako ovo rijesenje bude radilo sporo)
  {
    path: 'logged',
    component: HomeComponent,
    children: [
      {
        path: 'narudzbe',
        component: NarudzbeComponent,
      },
      {
        path: 'novi-unos',
        component: NoviUnosComponent,
      },
      {
        path: 'postavke',
        component: PostavkeComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
