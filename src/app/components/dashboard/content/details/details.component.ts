import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../../../models/product";
import {HttpService} from "../../../../services/http.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  product: Product;
  currentPrice: number;
  user: string;
  message: string;

  constructor(private route: ActivatedRoute, private http: HttpService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: params => {
        this.http.getProduct(params['id']).subscribe({
          next: res => {
            console.log(res);
            this.product = res.body;
            this.http.getCurrentPrice(this.product.id).subscribe({
              next: res => {
                this.currentPrice = res.body;
                console.log(res);
              }
            })
          }
        })
      }
    });
  }

  refreshPrices() {
    this.ngOnInit();
  }

  finishAuction() {
    this.http.finishAuction(this.product.id).subscribe({
      next: res => {
        console.log(res);
        this.user = res.body;
        if (this.user) {
          console.log(this.user);
          this.message = this.user === JSON.parse(sessionStorage.getItem('user')).userId ?
            'Congratulations! You have won' :
            'Sorry! You could not win this time, please try again later.'
        }
      }
    });
  }
}
