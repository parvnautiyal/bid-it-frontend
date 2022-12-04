import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ChronoUnit, LocalDateTime} from "@js-joda/core";
import {ProgressbarConfig} from "ngx-bootstrap/progressbar";
import {Product} from "../../../../../models/product";
import {HttpService} from "../../../../../services/http.service";

export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(), { animate: true, striped: true, max: 100 });
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [{ provide: ProgressbarConfig, useFactory: getProgressbarConfig }]
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  timer: NodeJS.Timer;
  value = 0.00;
  type: 'success' | 'info' | 'warning' | 'danger' = 'info';
  seconds = 0;
  minutes = 0;
  hours = 0;
  visible = true;
  bidAmount;
  @Input() currentPrice: number;
  @Output() refresh = new EventEmitter<void>();
  @ViewChild('input') input;
  @Output() finishAuction = new EventEmitter<void>();
  @Input() message: string = "Message";

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.startTimer();
    this.visible = true;
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.setType();
      let start = LocalDateTime.parse(this.product.start);
      let end = LocalDateTime.parse(this.product.end);
      let now = LocalDateTime.now();
      let differenceNowSeconds = ChronoUnit.SECONDS.between(now, end);
      let differenceNowMinutes = ChronoUnit.MINUTES.between(now, end);
      let differenceNowHours = ChronoUnit.HOURS.between(now, end);
      this.seconds = differenceNowSeconds % 60;
      this.minutes = differenceNowMinutes % 60;
      this.hours = differenceNowHours;
      let totalDif = ChronoUnit.SECONDS.between(start, end);
      this.value = ((totalDif - differenceNowSeconds) / totalDif) * 100.00;
      if (this.value >= 100.00) {
        this.finishAuction.emit();
        this.visible = false;
        console.log('ENDED ' + this.message);
        clearInterval(this.timer);
        this.value = 100.00;
      }
    }, 1000);
  }

  setType() {
    if (this.value < 25.00) {
      this.type = 'success'
    } else if (this.value < 50.00) {
      this.type = 'info'
    } else if (this.value < 90.00) {
      this.type = 'warning'
    } else if (this.value >= 90.00) {
      this.type = 'danger'
    }
  }

  addBid(id: string) {
    let userId = JSON.parse(sessionStorage.getItem('user')).userId;
    let json = {
      productId: id,
      userId: userId,
      amount: this.bidAmount.toString()
    };
    this.httpService.addBid(json).subscribe({
      next: res => {
        this.refreshPrice();
        this.input.reset();
        console.log(res);
      }
    });
    console.log(json);
  }

  refreshPrice() {
    this.refresh.emit();
  }
}
