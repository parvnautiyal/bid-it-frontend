import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  addProduct = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleAuction() {
    this.addProduct = !this.addProduct;
  }

}
