import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: firebase.User;
  email = '';
  password = '';
  errorMessage = '';
  error: { name: string; message: string } = { name: '', message: '' };

  constructor(private afAuth: AuthServiceService, private route: Router) {}

  ngOnInit(): void {
    this.afAuth.getAuth().subscribe((auth) => {
      if (auth) {
        this.route.navigate(['./logged/narudzbe']);
      }
    });
  }

  login(form) {
    this.afAuth.login(form.value.email, form.value.password);
  }
  navigateToHome() {
    this.route.navigate(['./logged/narudzbe']);
  }
}
