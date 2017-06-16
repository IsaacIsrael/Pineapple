import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'date-range-pickers-test',
  templateUrl: './date-range-picker.test.component.html',
  styleUrls: ['./date-range-picker.test.component.css']
})
export class DateRangePickerTestComponent implements OnInit {

  private value1:any;
  private value2:any;
  private value3:any = {start: "2017-05-26T03:00:00.000Z", end: "2017-06-02T03:00:00.000Z" };

  /*******************************************/

  constructor() { }

  ngOnInit() {
  }

}
