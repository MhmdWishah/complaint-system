import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chars-counter',
  templateUrl: './chars-counter.component.html',
  styleUrls: ['./chars-counter.component.scss']
})
export class CharsCounterComponent implements OnInit {
  @Input() value!: string;
  @Input() maxLength!: number;

  constructor() { }

  ngOnInit() {
  }

}
