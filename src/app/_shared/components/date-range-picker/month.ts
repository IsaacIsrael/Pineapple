import * as dateFns from 'date-fns';

export class Month{
    /******************** Fields ***********************/

        private _month: Date;
        private _days : Array<Date>;

    /******************* Properties ************************/

        public get month():Date{
            return this._month;
        }

        public get days():Array<Date>{
            return this._days;
        }

    /******************Constructor*************************/

        constructor(value:Date){
            this._month = dateFns.startOfMonth(value);
            this._days = dateFns.eachDay(dateFns.subDays(this.month, dateFns.getDay(this.month)),dateFns.endOfMonth(this.month))
        } 

    /***************** Methods**************************/

        public static forEachMonth(start:Date, end:Date):Array<Month>{
            
            let list: Array<Month> = new Array();

            start = dateFns.startOfMonth(start);
            let numberOfMonth = dateFns.differenceInCalendarMonths(end, start);

            for(let index = 0; index <= numberOfMonth; ++index)
                list.push(new Month( dateFns.addMonths(start,index)));
            
            return list;
        }

        public isOnThisMonth(item:Date):boolean{
            return dateFns.isSameMonth(this.month,item);
        }
}