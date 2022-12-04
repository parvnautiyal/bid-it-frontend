import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Output() ticketOpen = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleTicket() {
    this.ticketOpen.emit();
  }

}
