import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  ticket = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleTicket() {
    this.ticket = !this.ticket;
  }
}
