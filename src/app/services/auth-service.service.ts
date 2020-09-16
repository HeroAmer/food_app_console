import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser:any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {}

  getUserState(){
    return this.afAuth.authState
  }

  getAuth(){
    return this.afAuth.authState.map(auth => auth);
  }


  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        this.eventAuthError.next(error);
      })
      .then((userCrediential) => {
        if (userCrediential) {
          this.router.navigate(['/logged/narudzbe']);
          console.log(userCrediential);
        }
      });
  }

createUser(user){
  this.afAuth.createUserWithEmailAndPassword(user.email , user.password)
  .then(userCredential => {
    this.newUser = user;
    userCredential.user.updateProfile({
      displayName : user.fullname
    });

    this.insertUserData(userCredential)
    .then(()=>{
      alert("Dodan novi user!")
    })
  })
}

insertUserData(userCredential:firebase.auth.UserCredential){
  return this.db.doc(`employees/${userCredential.user.uid}`).set({
    email:this.newUser.email,
    fullname : this.newUser.fullname,
    role: 'admin'
  })
}

  logout(){
    this.afAuth.signOut();
  }
}
