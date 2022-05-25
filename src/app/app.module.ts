import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SwapmateDataService } from './services/swapmate-data.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { DatePipe } from '@angular/common';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { allIcons } from 'ngx-bootstrap-icons';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './admin/login/login.component';
import { HeaderComponent } from './admin/header/header.component';
import { HomeComponent } from './admin/home/home.component';
import { ShowroomComponent } from './admin/showroom/showroom.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { CalendarComponent } from './admin/calendar/calendar.component';
import { DonationsComponent } from './admin/donations/donations.component';
import { CalculatorComponent } from './admin/calculator/calculator.component';
import { MainSiteComponent } from './main-site/main-site.component';
import { StockListComponent } from './admin/stock/stock-list/stock-list.component';
import { StoreComponent } from './customer/store/store.component';
import { UploadFormComponent } from './admin/upload-form/upload-form.component';
import { UploadListComponent } from './admin/upload-list/upload-list.component';
import { UploadDetailsComponent } from './admin/upload-details/upload-details.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: HeaderComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'cshowroom', component: ShowroomComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'appointments', component: CalendarComponent },
      { path: 'stock', component: StockListComponent },
      { path: 'donate', component: DonationsComponent },
      { path: 'showroom', component: CalculatorComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'site', component: MainSiteComponent },
  { path: 'store', component: StoreComponent },
  { path: '**', redirectTo: '/site', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    ShowroomComponent,
    OrdersComponent,
    CustomersComponent,
    CalendarComponent,
    DonationsComponent,
    CalculatorComponent,
    MainSiteComponent,
    StockListComponent,
    StoreComponent,
    UploadFormComponent,
    UploadListComponent,
    UploadDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // for firestore,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxBootstrapIconsModule.pick(allIcons),
    DataTablesModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  providers: [DatePipe, SwapmateDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
