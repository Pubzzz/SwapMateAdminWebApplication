import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { ShowroomService } from 'src/app/services/showroom.service';
import { Stock } from 'src/app/models/stock.model';
import { Showroom } from 'src/app/models/showroom.model';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer.model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import xml2js from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'],
  providers: [DatePipe],
})
export class StockListComponent implements OnInit {
  productpoints: string;
  productsize: string;
  productname: string;
  productcategory: string;
  productnotes: string;
  points: string;
  new_points = 0;
  selectedStock = [];
  addedStock = [];
  tempStock = [];
  isLoading = false;
  isSuccess = false;
  isNSuccess = false;
  isTranSuccess = false;
  isTranNSuccess = false;
  isSNSuccess = false;
  isSSuccess = false;
  isRejected = false;
  public Apparels: any;
  public retrievedCustomer: any;
  apparelsAll = [];
  apparelTypesArr = [];
  conditionTypesArr = [];
  billTypesArr = [];
  tagTypesArr = [];
  brandTypesArr = [];
  addedItems = [];
  itemScore = 1;
  conditionScore = 1;
  billScore = 1;
  tagScore = 1;
  brandScore = 1;
  totalScore = 0;
  userTot = 0;
  highestId = null;
  latestID = null;
  itemDate: any;
  productID: string;
  stocks?: Stock[];
  stock: Stock = new Stock();
  showrooms?: Showroom[];
  showroom: Showroom = new Showroom();
  customers?: Customer[];
  customer: Customer = new Customer();
  myDate = new Date().toLocaleString();
  public _values1: string[] = [
    "Ladies' Wear",
    "Mens' Wear",
    "Kids' Wear",
    'General',
  ];
  public _values2: string[] = [];
  constructor(
    private stockService: StockService,
    private router: Router,
    private datePipe: DatePipe,
    private http: HttpClient,
    private showroomService: ShowroomService,
    private customerService: CustomerService
  ) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.loadJsFile('/assets/js/script.js');
    this.retrieveStocks();
    this.appareltype();
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
    this.retrieveStocks();
  }
  logMeOut() {
    this.router.navigateByUrl('login');
  }
  retrieveStocks(): void {
    this.isLoading = true;
    this.stockService.getAll().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.stocks = data;
        console.log(data);
        this.highestId = data.sort(function (a, b) {
          return parseInt(b.sid) - parseInt(a.sid);
        });
        this.latestID = this.highestId[0].sid;
      },
      error: (e) => console.error(e),
    });
  }
  firstDropDownChanged(val: any) {
    console.log(val);

    if (val == "Ladies' Wear") {
      this._values2 = [
        'Bridal Wear',
        'Party Frocks',
        'Ordinary Frocks',
        'Crop Tops',
        'Blouses',
        "Ladies' Office Trousers",
        "Ladies' Denims",
        "Ladies' Leggings",
        "Ladies' Skirts",
        "Ladies' Shorts",
        "Ladies' Night Dresses",
        'Earings/Rings',
        'Necklaces',
        'Heels',
        'Hand Bags',
      ];
    } else if (val == "Mens' Wear") {
      this._values2 = [
        "Groom's Wear",
        "Mens' Tshirts",
        "Mens' Shirts",
        "Mens' Office Trousers",
        "Mens' Shorts",
        "Mens' Denims",
        'Sarongs',
        "Mens' Night Dresses",
        'Wallets',
        'Blassers',
        "Mens' Ties/Bows",
      ];
    } else if (val == "Kids' Wear") {
      this._values2 = [
        'Frocks',
        "Kids' Tshirts",
        "Kids' Shirts",
        "Kids' Skirts",
        "Kids' Shorts",
        'Pants/Denims',
        "Kids' Leggings",
        "Kids' Socks",
        "Kids' Hats",
        "Kids' Accessories",
        "Kids' Footwear",
        "Kids' Ties/Bows",
      ];
    } else {
      this._values2 = [
        'Travelling Bags',
        'Gym Bags',
        'School Bags',
        'Shades/Sunglasses',
        'Watches',
        'Shoes',
        'Belts',
        'Footware',
      ];
    }
  }
  saveStock(): void {
    const data = {
      sid: parseInt(this.latestID) + 1,
      bill: this.stock.bill,
      brand: this.stock.brand,
      condition: this.stock.condition,
      date: this.myDate,
      points: this.totalScore,
      size: this.stock.size,
      tag: this.stock.tag,
      type: this.stock.type,
      category: this.stock.category,
    };
    this.stockService.create(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });
    this.tempStock.push({
      id: data.sid,
      points: data.points,
    });
    console.log(this.tempStock);
    //this.addedItems[0] = [data.sid, data.points];
    //console.log(this.addedItems);
    this.isSuccess = true;
    this.isNSuccess = false;
    this.FadeOutLink2();
  }
  FadeOutLink2() {
    setTimeout(() => {
      this.isSuccess = false;
      this.isNSuccess = false;
      this.isTranSuccess = false;
      this.isTranNSuccess = false;
      this.isSNSuccess = false;
      this.isSSuccess = false;
      this.refreshList();
    }, 2000);
  }
  saveApparel(): void {
    const data = {
      srid: this.productID,
      date: this.itemDate,
      points: this.productpoints,
      size: this.productsize,
      name: this.productname,
      category: this.productcategory,
      notes: this.showroom.notes,
    };
    this.showroomService.create(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });
    this.stockService.delete(this.productID).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });
    this.stocks.forEach((element, index) => {
      if (element == this.productID) this.stocks.splice(index, 1);
    });
    console.log(this.stocks);
    this.isSNSuccess = false;
    this.isSSuccess = true;
    this.FadeOutLink2();
  }
  //getting appareltype data function
  public appareltype() {
    /*Read Data*/
    return this.http
      .get('assets/SwapMateData.xml', {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append(
            'Access-Control-Allow-Headers',
            'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method'
          ),
        responseType: 'text',
      })
      .subscribe((data) => {
        this.parseXML(data).then((data) => {
          this.Apparels = data;
        });
      });
    /*Read Data*/
  }
  //  selectedType: string = '';
  //store xml data into array variable
  parseXML(data) {
    return new Promise((resolve) => {
      var k: string | number,
        tagarr = [],
        apparelsAll = [],
        apparr = [],
        conditionarr = [],
        billarr = [],
        brandarr = [],
        parser = new xml2js.Parser({
          trim: true,
          explicitArray: true,
        });
      parser.parseString(data, function (err, result) {
        var obj1 = result.Apparels.ApparelType[0];
        for (k in obj1.app) {
          var app = obj1.app[k];
          apparr.push({
            id: app.id[0],
            name: app.name[0],
            score: app.score[0],
          });
        }

        apparelsAll.push({
          id: 'ApperalType',
          value: apparr,
        });

        var obj1 = result.Apparels.ConditionType[0];
        for (k in obj1.Condition) {
          var Condition = obj1.Condition[k];
          conditionarr.push({
            id: Condition.id[0],
            name: Condition.name[0],
            score: Condition.score[0],
          });
        }

        apparelsAll.push({
          id: 'ConditionType',
          value: conditionarr,
        });

        var obj1 = result.Apparels.TagType[0];
        for (k in obj1.Tag) {
          var Tag = obj1.Tag[k];
          tagarr.push({
            id: Tag.id[0],
            name: Tag.name[0],
            score: Tag.score[0],
          });
        }
        apparelsAll.push({
          id: 'TagType',
          value: tagarr,
        });

        var obj1 = result.Apparels.BillType[0];
        for (k in obj1.Bill) {
          var Bill = obj1.Bill[k];
          billarr.push({
            id: Bill.id[0],
            name: Bill.name[0],
            score: Bill.score[0],
          });
        }
        apparelsAll.push({
          id: 'BillType',
          value: billarr,
        });
        var obj1 = result.Apparels.BrandType[0];
        for (k in obj1.Brand) {
          var Brand = obj1.Brand[k];
          brandarr.push({
            id: Brand.id[0],
            name: Brand.name[0],
            score: Brand.score[0],
          });
        }
        apparelsAll.push({
          id: 'BrandType',
          value: brandarr,
        });
        resolve(apparelsAll);
      });
    });
  }
  makeTransaction(): void {
    this.customerService.get(this.customer.email).subscribe({
      next: (res) => {
        this.retrievedCustomer = res;
      },
      error: (e) => console.error(e),
    });
    this.new_points = this.userTot + parseInt(this.retrievedCustomer.points);
    const data = {
      id: this.retrievedCustomer.id,
      cid: this.retrievedCustomer.cid,
      points: this.new_points.toString(),
      nic: this.retrievedCustomer.nic,
      address: this.retrievedCustomer.address,
      age: this.retrievedCustomer.age,
      contact: this.retrievedCustomer.contact,
      email: this.retrievedCustomer.email,
      gender: this.retrievedCustomer.gender,
      regdate: this.retrievedCustomer.regdate,
      size: this.retrievedCustomer.size,
      firstname: this.retrievedCustomer.firstname,
      lastname: this.retrievedCustomer.lastname,
    };
    console.log(data);
    this.customerService.update(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });
    this.isTranSuccess = true;
    this.isTranNSuccess = false;
    this.FadeOutLink2();
  }

  Calculate() {
    this.apparelTypesArr = this.Apparels[0].value;
    for (let i = 0; i < this.apparelTypesArr.length; i++) {
      if (this.apparelTypesArr[i].name == this.stock.type) {
        this.itemScore = this.apparelTypesArr[i].score;
        this.calcTot();
      }
    }
    this.conditionTypesArr = this.Apparels[1].value;
    for (let i = 0; i < this.conditionTypesArr.length; i++) {
      if (this.conditionTypesArr[i].name == this.stock.condition) {
        this.conditionScore = this.conditionTypesArr[i].score;
        this.calcTot();
      }
    }
    this.billTypesArr = this.Apparels[3].value;
    for (let i = 0; i < this.billTypesArr.length; i++) {
      if (this.billTypesArr[i].name == this.stock.bill) {
        this.billScore = this.billTypesArr[i].score;
        this.calcTot();
      }
    }
    this.tagTypesArr = this.Apparels[2].value;
    for (let i = 0; i < this.tagTypesArr.length; i++) {
      if (this.tagTypesArr[i].name == this.stock.tag) {
        this.tagScore = this.tagTypesArr[i].score;
        this.calcTot();
      }
    }
    this.brandTypesArr = this.Apparels[4].value;
    for (let i = 0; i < this.brandTypesArr.length; i++) {
      if (this.brandTypesArr[i].name == this.stock.brand) {
        this.brandScore = this.brandTypesArr[i].score;
        this.calcTot();
      }
    }
  }
  calcTot() {
    this.totalScore =
      this.itemScore *
      this.conditionScore *
      this.billScore *
      this.tagScore *
      this.brandScore;
    if (this.itemScore == this.totalScore) {
      this.isRejected = true;
    } else {
      this.isRejected = false;
    }
    if (this.billScore == 1 && this.tagScore == 1) {
      this.isRejected = true;
    }
  }
  reset(stock) {
    this.stock.category = '';
    this.stock.type = '';
    this.stock.bill = '';
    this.stock.brand = '';
    this.stock.condition = '';
    this.stock.size = '';
    this.stock.tag = '';
    this.totalScore = null;
    this.isRejected = false;
  }
  RowSelected(u: any) {
    console.log(u);
    this.selectedStock[0] = u;
    this.productID = this.selectedStock[0].sid;
    this.productpoints = this.selectedStock[0].points;
    this.productsize = this.selectedStock[0].size;
    this.productcategory = this.selectedStock[0].category;
    this.productname = this.selectedStock[0].type;
    this.itemDate = this.selectedStock[0].date;
  }
  calculateUserPoints() {
    for (let x = this.tempStock.length; x <= this.tempStock.length; x++) {
      var val = x - 1;
      var value = this.tempStock[val].points;
      this.userTot = this.userTot + value;
    }
  }
  resettempStock() {
    this.tempStock = [];
    this.userTot = 0;
    this.customer.email = '';
  }
}
