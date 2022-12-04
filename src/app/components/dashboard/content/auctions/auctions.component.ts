import {HttpParams} from "@angular/common/http";
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LocalDateTime} from "@js-joda/core";
import {Product} from "../../../../models/product";
import {HttpService} from "../../../../services/http.service";

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent implements OnInit {

  products: Product[];
  userDetails = false;
  error = false;

  constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.httpService.getProducts().subscribe({
      next: res => {
        this.products = res.body;
        console.log(res);
        this.error = res.body.length <= 0;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  openUserDetals() {
    this.userDetails = true;
  }

  closeUserDetals() {
    this.userDetails = false;
  }

  calculateTime(product: Product) {
    let end = LocalDateTime.parse(product.end);
    let date = end.dayOfMonth();
    let formattedMinutes;
    let month = end.month().toString().toLowerCase();
    month = end.month().toString().toLowerCase().charAt(0).toUpperCase() + month.substring(1, month.length);
    let hour = end.hour();
    let minutes = end.minute();
    if (minutes < 10)
      formattedMinutes = '0' + +minutes;
    else formattedMinutes = +minutes;
    let format = hour < 12 ? 'AM' : 'PM';
    if (hour === 0)
      hour = 12;
    return +hour + ':' + formattedMinutes + format + ' on ' + +date + ' ' + month;
  }

  showProduct(id: string) {
    const params: HttpParams = new HttpParams().set('id', id);
    const queryParams = {};
    params.keys().forEach((key) => {
      queryParams[key] = params.get(key);
    });
    this.router.navigate(['details'], { relativeTo: this.route, queryParams });
  }
}
