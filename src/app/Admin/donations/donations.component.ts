import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonationService } from 'src/app/services/donation.service';
import { Donation } from 'src/app/models/donation.model';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css'],
})
export class DonationsComponent implements OnInit {
  isLoading = false;
  selectedDonations = [];
  donations?: Donation[];
  Donation: Donation = new Donation();
  constructor(
    private router: Router,
    private donationService: DonationService
  ) {}
  dtOptions: DataTables.Settings = {};
  selection = new SelectionModel<Donation>(true, []);
  ngOnInit(): void {
    this.loadJsFile('/assets/js/script.js');
    this.retrieveRecords();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
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
  logMeOut() {
    this.router.navigateByUrl('login');
  }
  retrieveRecords(): void {
    this.isLoading = true;
    this.donationService.getAll().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.donations = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  onToggle(donation: Donation) {
    this.selection.toggle(donation);
    this.selectedDonations = this.selection.selected;
    console.log(this.selectedDonations);
  }
  clearDonations() {
    if (this.selectedDonations.length == 0) {
      Swal.fire({
        title: 'No items selected!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, clear selected!',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'The selected donations have been deleted.',
            'success'
          );
          for (let i = 0; i < this.selectedDonations.length; i++) {
            this.donationService
              .delete(this.selectedDonations[i].did)
              .subscribe({
                next: (res) => {
                  console.log(res);
                },
                error: (e) => console.error(e),
              });
            this.retrieveRecords();
          }
          //let timerInterval;
          //Swal.fire({
          //  title: 'Someting went Wrong, Try Again!',
          //  timer: 2000,
          //  timerProgressBar: true,
          //  willClose: () => {
          //    clearInterval(timerInterval);
          //  },
          //}).then((result) => {
          //  /* Read more about handling dismissals below */
          //  if (result.dismiss === Swal.DismissReason.timer) {
          //    console.log('I was closed by the timer');
          //  }
          //});
        }
      });
    }
  }
}
