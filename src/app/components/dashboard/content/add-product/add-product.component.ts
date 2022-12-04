import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Product} from "../../../../models/product";
import {HttpService} from "../../../../services/http.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  value = 'H';
  @ViewChild('addForm') form;
  @Output() back = new EventEmitter<void>();

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let name = this.form.value['name'];
    let description = this.form.value['description'];
    let img = this.form.value['img'];
    let duration = +this.form.value['duration'] + this.form.value['tf'];
    let amount = +this.form.value['amount'];
    let product = new Product(null, name, description, img, duration, null, null, amount, null, null, null);
    console.log(product);
    this.httpService.addAuction(product).subscribe({
      next: res => {
        console.log(res);
        this.form.reset();
        this.back.emit();
      }
    });
    console.log(this.form);
  }

  onReset() {
    this.form.reset();
  }

}
