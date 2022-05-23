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
  isSuccess = false;
  isNSuccess = false;
  productID: String;
  customerFN: String;
  customerLN: String;
  customerNIC: String;
  address: String;
  age: number;
  id: String;
  points: string;
  contact: String;
  email: String;
  gender: String;
  regdate: String;
  size: String;
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
      pageLength: 10,
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
    this.id = this.selectedcustomer[0].id;
    this.productID = this.selectedcustomer[0].cid;
    this.customerFN = this.selectedcustomer[0].firstname;
    this.customerLN = this.selectedcustomer[0].lastname;
    this.customerNIC = this.selectedcustomer[0].nic;
    this.address = this.selectedcustomer[0].address;
    this.age = this.selectedcustomer[0].age;
    this.contact = this.selectedcustomer[0].contact;
    this.email = this.selectedcustomer[0].email;
    this.gender = this.selectedcustomer[0].gender;
    this.regdate = this.selectedcustomer[0].regdate;
    this.size = this.selectedcustomer[0].size;
    this.points = this.selectedcustomer[0].points;
    console.log(this.productID);
  }
  makeTransaction(): void {
    const data = {
      id: this.id,
      cid: this.productID,
      points: parseInt(this.points) + parseInt(this.customer.points),
      nic: this.customerNIC,
      address: this.address,
      age: this.age,
      contact: this.contact,
      email: this.email,
      gender: this.gender,
      regdate: this.regdate,
      size: this.size,
      firstname: this.customerFN,
      lastname: this.customerLN,
    };
    this.customerService.update(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });
    this.isSuccess = true;
    this.isNSuccess = false;
    this.FadeOutLink2();
  }
  FadeOutLink2() {
    setTimeout(() => {
      this.isSuccess = false;
      this.isNSuccess = false;
      this.refreshList();
    }, 2000);
  }
  resetField() {
    this.customer.points = '';
  }
}
