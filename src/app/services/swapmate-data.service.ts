import { Injectable } from '@angular/core';
import xml2js from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SwapmateDataService {
  public ApparelType: any;
  constructor(private http: HttpClient) {
    this.loadXML();
  }
  //getting data function
  public loadXML() {
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
          this.ApparelType = data;
          return this.ApparelType;
        });
      });
    /*Read Data*/
  }
  //store xml data into array variable
  parseXML(data) {
    return new Promise((resolve) => {
      var k: string | number,
        arr = [],
        parser = new xml2js.Parser({
          trim: true,
          explicitArray: true,
        });
      parser.parseString(data, function (err, result) {
        var obj1 = result.ApparelType;
        for (k in obj1.app) {
          var app = obj1.app[k];
          arr.push({
            id: app.id[0],
            name: app.name[0],
            score: app.score[0],
          });
        }
        resolve(arr);
      });
    });
  }
}
