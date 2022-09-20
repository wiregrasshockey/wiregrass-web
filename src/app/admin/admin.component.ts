import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public credentails = {
    email: '',
    password: ''
  }

  constructor(public auth: AngularFireAuth) {
  }
  login() {
    this.auth.signInWithEmailAndPassword(this.credentails.email, this.credentails.password).then(
      (result) => {
        console.log(result);
      }, (error) => {
        console.log(error);
      }
    );
  }
  logout() {
    this.auth.signOut();
  }

  ngOnInit(): void {
  }

}
