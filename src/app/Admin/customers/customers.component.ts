import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer.model';
import xml2js from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  isLoading = false;
  productID: String;
  customerFN: String;
  customerLN: String;
  selectedcustomer = [];
  customers?: Customer[];
  customer: Customer = new Customer();
  constructor(
    private router: Router,
    private customerService: CustomerService,
    private http: HttpClient
  ) {}
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.retrieveCustomers();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
    };
    $('#example1 tbody').on('click', 'tr', function () {});
  }

  logMeOut() {
    this.router.navigateByUrl('login');
  }
  refreshList(): void {
    this.retrieveCustomers();
  }
  retrieveCustomers(): void {
    this.isLoading = true;
    this.customerService.getAll().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.customers = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  RowSelected(u: any) {
    console.log(u);
    this.selectedcustomer[0] = u;
    this.productID = this.selectedcustomer[0].cid;
    this.customerFN = this.selectedcustomer[0].firstname;
    this.customerLN = this.selectedcustomer[0].lastname;
    console.log(this.productID);
  }
}
