import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myInterval = 2000;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(el: HTMLElement) {
    el.scrollIntoView();
  }

}
