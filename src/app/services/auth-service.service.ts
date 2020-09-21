import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Route, Router } from '@angular/router';
import { auth } from 'firebase';
import { BehaviorSubject, Observable, of  } from 'rxjs';
import { retry, switchMap } from 'rxjs/operators';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser:any;
  currentUser;
  user$:Observable<Employee>;
  juzer$:Observable<Employee>;

  usersCollection:AngularFirestoreCollection<Employee>;
  userr:Observable<Employee[]>;

  employeesCollection:AngularFirestoreCollection<Employee>;
  allEmployees:Observable<Employee[]>;


  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {

    this.employeesCollection = this.db.collection('employees');

    this.allEmployees = this.employeesCollection
      .snapshotChanges()
      .map((changes) => {
        return changes.map((c) => {
          const notifikacijeData = c.payload.doc.data() as Employee;
          return notifikacijeData;
        });
      });

  }

  // getUserState(){
  //   this.user$ = this.afAuth.authState.pipe(
  //     switchMap(user => {
  //       if (user) {
  //         return this.db.collection<Employee>(`users/${user.uid}`).valueChanges()
  //       } else {
  //         return of(null)
  //       }
  //     })
  //   )
  // }

  // returnUser(){
  //   return this.user$;
  // }

  // getAutorizacija(){
  //   this.juzer$ = this.afAuth.authState.pipe(switchMap(auth => {
  //     if(auth){
  //       return this.db.collection(`employees/${auth.uid}`).valueChanges();
  //     }else{
  //       return of(null);
  //     }
  //   }));}


  getAuth(){
      return this.afAuth.authState.map(auth => auth);
    // this.user$ = this.afAuth.authState.switchMap
    // this.user$ =  this.afAuth.authState.map(auth => {
    //   if(auth){
    //     return this.db.collection<Employee>(`employees/${auth.uid}`).valueChanges();
    //   }else{
    //     return of(null);
    //   }
    //   this.currentUser = auth.uid;
    //   console.log(this.currentUser);
    //   return auth;
    // });
  }

  getEmployees(){
    return this.allEmployees;
  }

  getUserDetails(userID){
    this.usersCollection = this.db.collection('employees', (ref) =>
    ref.where('uid', '==', userID )
  );
  this.userr = this.usersCollection.snapshotChanges().map((changes) => {
    return changes.map((c)=> {
      const userData = c.payload.doc.data() as Employee;
      return userData;
    });
  })

  }

  getUser(){
    return this.userr;
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
    uid: userCredential.user.uid,
    fullname : this.newUser.fullname,
    role: 'admin',
    seenNotifications: 0
  })
}

  logout(uid ,numberOfNotifications, userEmail, userFullname, role){
    this.update(uid ,numberOfNotifications, userEmail, userFullname, role ).then(()=>{
      this.afAuth.signOut();
    })
  }

  update(uid ,numberOfNotifications, userEmail, userFullname, role){
    return this.db.doc(`employees/${uid}`).set({
      email:userEmail,
      uid: uid,
      fullname : userFullname,
      role: role,
      seenNotifications: numberOfNotifications
    });
  }
}
