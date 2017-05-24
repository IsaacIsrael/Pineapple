import { Component, OnInit, HostListener, ElementRef, trigger, state, style, transition, animate, keyframes , Input , Output , EventEmitter } from '@angular/core';
import * as dateFns from 'date-fns';


@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  animations:[
      trigger('flyInOut',[
        state('in',style({ height:'*',opacity: '1' },)),
        state('out',style({ height:'0', overflow:'hidden',opacity: '0'})),
        transition('out =>in',
          animate('0.3s  ease-in',keyframes([
            style({opacity: 0,transform: 'translateY(-100%)',height:'0', offset: 0}),
            style({opacity: 0, transform: 'translateY(-5px)',height:'*',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)', height:'*',    offset: 1.0})
          ]))
        ),
        transition('in =>out',  
          animate('0.3s  ease-in',keyframes([
            style({opacity: 1, transform: 'translateY(0)', height:'*',    offset: 0}),
            style({opacity: 0, transform: 'translateY(-5px)',height:'*', offset: 0.7}),
            style({opacity: 0, transform: 'translateY(-100%)',height:'0',  offset: 1.0})
          ]))
        )
      ]),
    ],
})
export class DatePickerComponent implements OnInit {
  @Input()untilToday: boolean = false;
  @Input()placeholder: string = "";
  @Input()value: {start:Date , end:Date} ;
  @Output()valueChange : EventEmitter<any> = new EventEmitter();
  
  private state : 'in'|'out' = 'out'; 
  private range: 'from' | 'to';
  
  private selectedRange:string = "";

  private  date: Date;
  private days: Date[];

 @HostListener('document:click', ['$event'])
  handleClick(e: MouseEvent) {
    let target = e.srcElement || e.target;
    
    if (!this.elementRef.nativeElement.contains(e.target) 
      && !(<Element>target).classList.contains('day-num')) 
        this.closeCalendar();
  }

  constructor(private elementRef: ElementRef) { 
  }

  ngOnInit() {
    this.setCalendar(new Date());
    this.value = this.value == undefined ? {start:undefined,end:undefined}: this.value;
  }

  private openCalendar(range : 'from' | 'to'): void{
    
    if(this.range != range)
      this.range = range;
    
    if(this.value.end == undefined && this.value.start == undefined && this.state == 'out')
      this.onSelectWeek(undefined,0); 

    this.state = 'in'
  }  

  private closeCalendar(): void{
    this.state = 'out';
    this.range = undefined;
  }

  private isValidCalendarMonth(date:  Date): boolean{
    return  date != undefined 
      &&  !(this.untilToday && dateFns.isAfter(date,new Date()))
      && (!dateFns.isSameYear(this.date,date) || !dateFns.isSameMonth(this.date,date))
  }

  private setCalendar(date: Date): boolean{
    if(!this.isValidCalendarMonth(date) )
        return false;

    this.date = dateFns.startOfMonth(dateFns.startOfDay(date));
    
    let start: Date  = dateFns.subDays(this.date , dateFns.getDay(this.date ))
    let end: Date  = dateFns.endOfMonth(this.date); 
    
    this.days = [];
    this.days = dateFns.eachDay(start,end);

    return true;
  }

  /////////////////////

  private isValidDate(date : Date): boolean{
    return( 
           (this.range === 'from' && (dateFns.isBefore(date, this.value.end) || this.value.end == undefined )) 
            || (this.range === 'to' && (dateFns.isAfter(date, this.value.start) || this.value.start == undefined))
            || (date ==  undefined)
        )   &&  !(this.untilToday && dateFns.isAfter(date,new Date())) ;
  }

  private setRangeDate(date: Date): boolean{
      
      if(!this.isValidDate(date) )
        return false

      this.range === 'from'? this.value.start= date : this.value.end = date;
      this.setCalendar(date);
      
      this.valueChange.emit(this.value);
      return true;
  }
  
  /////////////////////

  private isValidDates(dates: {initial:Date,final:Date}): boolean{
      return (
              (dateFns.isBefore(dates.initial, dates.final)) 
          || (dates.initial ==  undefined || dates.final ==  undefined)
          )&&  !(this.untilToday && dateFns.isAfter(dates.final,new Date())) ;
  }

  private setRangeDates(dates: {initial:Date,final:Date}): boolean{
    if(!this.isValidDates(dates))
      return false;

    this.value.start = dates.initial;
    this.value.end = dates.final;
    this.range = "from"
    
    this.setCalendar(dates.final);
    this.valueChange.emit(this.value);
    
    return true;
  }
  
  /////////////////////////////////////////////////////////////

  onToggleCalendar(e: MouseEvent, arg: 'from' | 'to'): void {
    this.openCalendar(arg);
  }

  onPrevMonth(e: MouseEvent): void {
    this.setCalendar(dateFns.subMonths(this.date, 1));
  }

  onNextMonth(e: MouseEvent): void {
      this.setCalendar(dateFns.addMonths(this.date, 1));
  }

  // onInput( e: Event): void{
  //   e.preventDefault();
    
  //   let element : any = e.target;
  //   let value = element.value.split('-');
  //   let date =  value[0] >= 1902  ? dateFns.startOfDay(new Date(value[0], value[1]-1, value[2])) : undefined

  //   let notChangedd = !this.setRangeDate(date)

  //   if(notChangedd && this.range === 'from')
  //     element.value = this.Start;
  //   else if(notChangedd && this.range === 'to')
  //     element.value = this.End;

  //   this.selectedRange="";
  // }

  // onSelectDate(e: MouseEvent, arg: any): void {
  //   e.preventDefault();
    
  //   if(!this.setRangeDate(arg))
  //       return;
    
  //  this.range = this.range === 'from' ? 'to' :'from';
  //   this.selectedRange="";
  // }

  onSelectWeek(e: MouseEvent, arg:any):void{
    let today = dateFns.startOfDay(new Date());
    let dates = {
      initial:dateFns.subWeeks(dateFns.subWeeks(today,1),arg), 
      final:dateFns.subWeeks(today,arg)
    };

    if(this.setRangeDates(dates))
      this.selectedRange = arg.toString();
  }
  
  onClearRange(e: MouseEvent): void{
    this.setRangeDates({initial:undefined,final:undefined});
  }
  

  /********************************/
  
  // get Start():string{
  //   return dateFns.format(this.value.start,"YYYY-MM-DD");
  // }

  // get End():string{
  //   return dateFns.format(this.value.end,"YYYY-MM-DD");
  // }

  // isOnMonth(date:Date){
  //   return dateFns.isSameMonth(date,this.date);
  // }
  
  // isOnRange(date: Date): boolean{
  //   return dateFns.isWithinRange(date,this.value.start,this.value.end);
  // }

  // isEnd(date:Date): boolean{
  //   return  dateFns.isSameDay(this.value.end, date);
  // }

  // isStart(date:Date): boolean{
  //   return  dateFns.isSameDay(this.value.start, date);
  // }

  // isDisable(date:Date):boolean{
  //   return this.untilToday && dateFns.isAfter(date,new Date())
  // }

}