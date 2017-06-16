import { Component, OnInit, HostListener ,Input,Output, EventEmitter ,ElementRef } from '@angular/core';
import * as _ from "lodash";
import * as dateFns from 'date-fns';

import { Slide } from '../../animations/slideIn-slideOut.animation'

import { Month } from './month';
import { DateRange } from './date-range';

const NUMBER_OF_MONTH :number = 3;

@Component({
  selector: 'date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css'],
  animations: [ Slide(500,-15) ],
})
export class DateRangePickerComponent implements OnInit {
  
  @Input()untilToday: boolean = false;
  @Input()disabled: boolean = false;

  @Output() valueChange : EventEmitter<any> = new EventEmitter();
  @Input()set value(value:{'start':Date,'end':Date}){
    if(value)
      this._value = new DateRange(value.start,value.end);
  }
  get value():{'start':Date,'end':Date}{
    return {'start':this._value.Start,'end':this._value.End};
  }

  /*******************************************/

  private range: 'start' | 'end' = 'start';
  private isFocus:  boolean = false;

  private _calendar:Array<Month> = new Array<Month>();
  private _calendarRange:DateRange = new DateRange(); 
  private _value:DateRange = new DateRange();


  /*******************************************/

  private set CalendarDate(value:Date){
    if( !value || this.CalendarRange.isOnRange(value))
      return;

    let end = dateFns.startOfMonth(value);
    this.CalendarRange = new DateRange(dateFns.subMonths(end ,NUMBER_OF_MONTH),end);
  }

  private set CalendarRange(value:DateRange){

    if(_.isEqual(this._calendarRange,value))
      return;

    this._calendarRange = value;
    this._calendar =  Month.forEachMonth(this._calendarRange.Start,this._calendarRange.End);
  }
  private get CalendarRange():DateRange{
      return this._calendarRange;
  }
 
  private set ValueDate(value:Date){

    if(_.isEqual(this.ValueDate, value))
      return;

    this._value[_.capitalize(this.range)] = value
    this.CalendarDate = value ;
    this.valueChange.emit(this.value);
  }
  private get ValueDate():Date{
    return this._value[_.capitalize(this.range)];
  }

  private set Value(value:DateRange){
    if(_.isEqual(this._value, value))
      return;

    this._value = value
    this.CalendarDate = value.End ;
    this.valueChange.emit(this.value);
  }
  private get Value():DateRange{
    return this._value;
  }

  private get Calendar(): Array<Month>{
    return this._calendar;
  }

  /*******************************************/

  @HostListener('document:keyup.Shift.Tab', ['$event'])
  @HostListener('document:keyup.Tab', ['$event'])
  @HostListener('document:mousedown', ['$event'])
  onBlurHostListener(e: Event) {
      let target = e.srcElement || e.target;

      if ( this.isFocus && !this._elementRef.nativeElement.contains(e.target))
        this.isFocus = false;
  }

  /*******************************************/

  constructor(private _elementRef:ElementRef) { }

  ngOnInit() {
    this.CalendarDate = new Date ();
  } 
  /*******************************************/


  private previousMonth(){
    this.CalendarRange = new DateRange( dateFns.subMonths(this.CalendarRange.End,NUMBER_OF_MONTH+1) , dateFns.subMonths(this.CalendarRange.End,1));
  }

  private nextMonth(){
    let date =  dateFns.addMonths(this.CalendarRange.End,1)

    if(!this.isDisable(date))
      this.CalendarDate = date;
  }

  private isDisable(value:any):boolean{
    return this.untilToday && dateFns.isAfter(value,new Date()) ;
  }

  private rangeChange():void{
    this.range =  this.range == 'start' ? 'end': 'start';
  }

  private setWeekRange(weeknumber:number):void{
    let today = dateFns.startOfDay(new Date());
    this.Value = new DateRange(dateFns.subWeeks(today,1 + weeknumber),dateFns.subWeeks(today,0 + weeknumber));
  }

  /*******************************************/

  private onFocusEventHandler(e:Event,arg:any):void{
    this.range = arg;
    this.isFocus = true;
    this.CalendarDate = this.ValueDate;
  }

  private onInputEventHandler(e:Event):void{
    let element : any = e.target;
    let values = element.value.split('-');
    let value  = values[0] >= 1902  ? dateFns.startOfDay(new Date(values[0], values[1]-1, values[2])) : this.ValueDate;

    if(!this.isDisable(value))
      this.ValueDate  = value;
   
   if(!!this.ValueDate || this.isDisable(value) )
      element.value =  dateFns.format(this.ValueDate,"YYYY-MM-DD");
    
  }

  private onClearDateEventHandler(e:MouseEvent,arg:any):void{
    this.range = arg;
    this.ValueDate = undefined;
  }

  private onClearRangeEventHandler(e:MouseEvent):void{
    this.Value = new DateRange();
  }

  private onSelectDateEventHandler(e:MouseEvent,arg:any):void{
    if(this.isDisable(arg))
      return;

    this.ValueDate = arg;

    if( arg && _.isEqual(this.ValueDate,arg) )
      this.rangeChange();
  }

  private onChangeCalendarEventHandler(e:MouseEvent,arg:any):void{
    arg ==  'next' ?  this.nextMonth():this.previousMonth() ;
  }

  private onSelectWeekEventHandler(e:MouseEvent,arg:any):void{
    this.setWeekRange(arg);
    this.range = 'start';
  }
}
