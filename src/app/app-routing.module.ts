import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main-home/home/home.component';
import { NarudzbeComponent } from './main-home/home/narudzbe/narudzbe.component';
import { NoviUnosComponent } from './main-home/home/novi-unos/novi-unos.component';
import { PostavkeComponent } from './main-home/home/postavke/postavke.component';
import { LoginComponent } from './main-home/login/login.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { KategorijeComponent } from './main-home/home/kategorije/kategorije.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
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
        component: NarudzbeComponent,  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'novi-unos',
        component: NoviUnosComponent,  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'postavke',
        component: PostavkeComponent , canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'kategorije',
        component: KategorijeComponent , canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
