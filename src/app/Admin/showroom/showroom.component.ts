import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.css']
})
export class ShowroomComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  logMeOut(){
    this.router.navigateByUrl('login');
  }
}
