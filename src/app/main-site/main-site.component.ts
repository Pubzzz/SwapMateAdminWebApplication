import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-site',
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.css'],
})
export class MainSiteComponent implements OnInit {
  isAuth = false;
  isNotAuth = false;
  isNotEmail = false;
  isRAuth = false;
  isNotREmail = false;
  isNotRAuth = false;
  isNotRFields = false;
  isNotRPass = false;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadJsFile('assets/js/scripts.js');
  }
  public loadJsFile(url) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  FadeOutLink() {
    setTimeout(() => {
      this.router.navigateByUrl('/store');
    }, 2000);
  }
  FadeOutLink2() {
    setTimeout(() => {
      this.isNotAuth = false;
      this.isNotEmail = false;
      this.isRAuth = false;
      this.isNotREmail = false;
      this.isNotRAuth = false;
      this.isNotRFields = false;
      this.isNotRPass = false;
    }, 2000);
  }
  login(email: string, password: string) {
    if (email === '' || password === '') {
      this.isNotAuth = true;
      this.FadeOutLink2();
    } else {
      this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((value) => {
          this.isAuth = true;
          this.FadeOutLink();
        })
        .catch((error) => {
          if (error.code === 'auth/invalid-email') {
            this.isNotEmail = true;
            this.FadeOutLink2();
          } else {
            this.isNotAuth = true;
            this.FadeOutLink2();
          }
        });
    }
  }
  signup(displayName: string, email: string, password: string) {
    if (displayName === '') {
      this.isNotRFields = true;
      this.FadeOutLink2();
    } else if (email === '') {
      this.isNotRFields = true;
      this.FadeOutLink2();
    } else if (password === '') {
      this.isNotRFields = true;
      this.FadeOutLink2();
    } else if (password.length < 6) {
      this.isNotRPass = true;
      this.FadeOutLink2();
    } else {
      this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((value) => {
          this.isRAuth = true;
          this.FadeOutLink();
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            this.isNotRAuth = true;
            this.FadeOutLink2();
          } else if (error.code === 'auth/invalid-email') {
            this.isNotREmail = true;
            this.FadeOutLink2();
          }
        });
    }
  }
}
