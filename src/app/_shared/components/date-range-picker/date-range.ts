import * as dateFns from 'date-fns';
import * as _ from "lodash";

export class DateRange{
    
    private start : Date;
    private end:Date;

    /*******************************************/

    public set Start(value:Date){
        if(  !value || !this.End || dateFns.isBefore(value,this.End))
            this.start = value;
    }
    public get Start():Date{
        return this.start;
    }

    public set End(value:Date){
        if(!value || !this.Start || dateFns.isAfter(value,this.Start))
            this.end = value;
    }
    public get End():Date{
        return this.end;
    }

    /*******************************************/

    constructor(start?:Date,end?:Date){
        this.start = start;
        this.end = end;
    }

    /*******************************************/

    public isOnRange(date:Date):boolean{
        return dateFns.isWithinRange(date,this.start,this.end);
    }

    public isBeginning(date:Date):boolean{
        return dateFns.isEqual(this.start,date);
    }

    public isEnd(date:Date):boolean{
        return dateFns.isEqual(this.end,date);
    }
}