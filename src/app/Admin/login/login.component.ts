import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isAuth = false;
  isNotAuth = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  login(email: string, password: string) {
    if (email == 'Admin@gmail.com' && password == 'Admin123') {
      this.isNotAuth = false;
      this.FadeOutLink();
      this.isAuth = true;
      //this.router.navigateByUrl('dashboard/home');
    } else {
      this.isNotAuth = true;
      this.FadeOutLink2();
    }
  }
  reset() {
    this.isNotAuth = false;
  }
  FadeOutLink() {
    setTimeout(() => {
      this.router.navigateByUrl('dashboard/home');
    }, 2000);
  }
  FadeOutLink2() {
    setTimeout(() => {
      this.isNotAuth = false;
    }, 2000);
  }
}
