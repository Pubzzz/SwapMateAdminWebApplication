import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      lengthMenu: [15, 25, 30],
      processing: true,
    };
    $('#example1 tbody').on('click', 'tr', function () {});
  }
  logMeOut() {
    this.router.navigateByUrl('login');
  }
}
