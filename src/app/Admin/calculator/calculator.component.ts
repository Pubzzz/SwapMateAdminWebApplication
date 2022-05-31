import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowroomService } from 'src/app/services/showroom.service';
import { Showroom } from 'src/app/models/showroom.model';
import { DonationService } from 'src/app/services/donation.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Donation } from 'src/app/models/donation.model';
import { DatePipe } from '@angular/common';
import xml2js from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [DatePipe],
})
export class CalculatorComponent implements OnInit {
  isChecked = false;
  selectedItem = [];
  selectedItems = [];
  latestID = 0;
  productID: string;
  Days: any;
  isLoading = false;
  showrooms?: Showroom[];
  selectedData: Showroom;
  Showroom: Showroom = new Showroom();
  donations?: Donation[];
  Donation: Donation = new Donation();
  myDate = new Date().toLocaleString();
  itemDate: any;
  dtOptions: DataTables.Settings = {};
  constructor(
    private router: Router,
    private showroomService: ShowroomService,
    private donationService: DonationService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private uploadService: FileUploadService
  ) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }
  selection = new SelectionModel<Showroom>(true, []);
  ngOnInit(): void {
    this.loadJsFile('/assets/js/script.js');
    this.retrieveRecords();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      lengthMenu: [15, 25, 30],
      processing: true,
    };
    $('#example1 tbody').on('click', 'tr', function () {});
  }

  public loadJsFile(url) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  refreshList(): void {
    this.retrieveRecords();
  }

  logMeOut() {
    this.router.navigateByUrl('login');
  }

  retrieveRecords(): void {
    this.isLoading = true;
    this.showroomService.getAll().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.showrooms = data;
        for (let i = 0; i <= data.length; i++) {
          this.itemDate = data[i].date;
          // To set two dates to two variables
          var date1 = new Date(this.itemDate);
          var date2 = new Date(this.myDate);

          var Time = date2.getTime() - date1.getTime();
          this.Days = Time / (1000 * 3600 * 24); //Diference in Days
          data[i].date = this.Days;
        }
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  RowSelected(u: any) {
    this.selectedData = u;
    this.selectedItem[0] = u;
    this.productID = this.selectedItem[0].srid;

    console.log(this.selectedData);
  }
  deleteItem(u: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'The apparel item has been deleted.', 'success');
        this.showroomService.delete(this.productID).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e),
        });
        this.refreshList();
      }
    });
    console.log(u);
    this.selectedItem[0] = u;
    this.productID = this.selectedItem[0].srid;
    console.log(this.productID);
  }
  onToggle(showroom: Showroom) {
    this.selection.toggle(showroom);
    this.selectedItems = this.selection.selected;
    console.log(this.selectedItems);
  }
  addDonations() {
    if (this.selectedItems.length == 0) {
      Swal.fire({
        title: 'Please select donation items!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
      for (let i = 0; i < this.selectedItems.length; i++) {
        const data = {
          did: this.selectedItems[i].srid,
          category: this.selectedItems[i].category,
          size: this.selectedItems[i].size,
          date: this.myDate,
          type: this.selectedItems[i].name,
        };
        this.donationService.create(data).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e),
        });
        this.showroomService.delete(this.selectedItems[i].srid).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e),
        });
        this.refreshList();
      }
    }
  }
}
