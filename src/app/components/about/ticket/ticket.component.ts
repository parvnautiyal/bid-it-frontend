import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  @ViewChild('queryForm') queryForm;
  @Output() toggleTicket = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(queryForm: NgForm) {
    console.log(queryForm);
  }

  onReset() {
    this.queryForm.reset();
  }

  onBack() {
    this.toggleTicket.emit();
  }
}
