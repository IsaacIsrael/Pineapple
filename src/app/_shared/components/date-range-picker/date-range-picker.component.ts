import { Component, OnInit,Input } from '@angular/core';
import * as _ from "lodash";
import * as dateFns from 'date-fns';

import { Month } from './month';
import { DateRange } from './date-range';

@Component({
  selector: 'date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent implements OnInit {
  @Input()untilToday: boolean = true;

  private range: 'start' | 'end' = 'start';
  private isFocus:  boolean = true;

  private _calendar:Array<Month> = new Array<Month>();
  private _calendarRange:DateRange; 

  private _value:DateRange = new DateRange();

  /*******************************************/

  private set CalendarRange(value:DateRange){
    this._calendarRange = value;
    this._calendar =  Month.forEachMonth(this._calendarRange.Start,this._calendarRange.End);
  }
  private get CalendarRange():DateRange{
      return this._calendarRange;
  }
 
  private set Date(value:Date){
    this._value[_.capitalize(this.range)] = value
  }
  private get Date():Date{
    return this._value[_.capitalize(this.range)];
  }

  private get Value():DateRange{
    return this._value;
  }

  private get Calendar(): Array<Month>{
    return this._calendar;
  }
  
  /*******************************************/

  constructor() { }

  ngOnInit() {
    this.initializeCalendar()
  }

  /*******************************************/

  private initializeCalendar():void{
    let numberOfMonth = 4
    
    let end = dateFns.startOfMonth(new Date());
    let start: Date =  dateFns.subMonths(end , numberOfMonth);
    this.CalendarRange = new DateRange(start,end);
  }

  private previousMonths(){
      // let start = dateFns.subMonths(this.calendarRange.Start , 6);
      // this.calendar = _.concat(this.generateRangeMonths(start,6),_.slice(this.calendar, 0,6));
      // this.calendarRange = new DateRange(_.first(this.calendar).month , _.last(this.calendar).month)
      // console.log(this.calendar);
  }

  private nextMonths(){
  //  let firstPart  = this.calendar.splice(6);
  //  let secondPart = this.generateRangeMonths(this.calendarRange.End,6);
  //  console.log(firstPart);
  //  console.log(secondPart);
  //  console.log(this.calendarRange.End);
  //  console.log(_.concat(,));
  }



  private isDisable(value:any):boolean{
    return this.untilToday && dateFns.isAfter(value,new Date()) ;
  }

  private rangeChange():void{
    this.range =  this.range == 'start' ? 'end': 'start';
  }

  /*******************************************/

  private onFocusEventHandler(e:Event,arg:any):void{
    this.range = arg;
    this.isFocus = true;
  }

  private onInputEventHandler(e:Event):void{
    let element : any = e.target;
    let values = element.value.split('-');
    let value = values[0] >= 1902  ? dateFns.startOfDay(new Date(values[0], values[1]-1, values[2])) : undefined;

    if(!this.isDisable(value))
      this.Date = value;
    else
      element.value =  dateFns.format(this.Date,"YYYY-MM-DD");
  }

  private onClearEventHandler(e:MouseEvent,arg:any):void{
    this.range = arg;
    this.Date = undefined;
  }

  private onSelectDateEventHandler(e:MouseEvent,arg:any):void{
    if(this.isDisable(arg))
      return;

    this.Date = arg;

    if( arg && _.isEqual(this.Date,arg) )
      this.rangeChange();
  }

  private onScrollDownEventHandler(e:any){
    //  this.nextMonths();
  }

  private onScrollUpEventHandler(e:any){
      // this.previousMonths();
  }

  private onScrollEventHandler(e:Event){
    let target :any = e.target;
    if(target.scrollTop == 0){
      
      target.scrollTop =  target.clientHeight * 0.30;
      console.log(target.clientHeight * 0.5);
      console.log(target.scrollTop); 

    }
  }

}
