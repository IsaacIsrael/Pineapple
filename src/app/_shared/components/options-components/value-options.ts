import {EventEmitter} from '@angular/core';
import * as _ from "lodash";

export abstract class  ValueOption{
    
    protected _value: any;
    protected valueChange : EventEmitter<any> = new EventEmitter();

    /*******************************************/
        
    abstract Value:any;

    get ValueChange():EventEmitter<any>{
        return this.valueChange;
    }; 

    /*******************************************/

     static createInstance<T extends ValueOption>(instance: new () => T): T{
         return new instance();
     }

    abstract clearValue():void ;
    
    abstract isValue(value:any):boolean;
}

export class SingleValueOptions extends ValueOption{

    set Value(value:any){
         if( _.isEqual(value,this._value))
            return;

     this._value  = value;
     this.valueChange.emit(this._value);

    };
    get Value():any{
        return this._value;
    }; 

    /*******************************************/

    constructor() {
        super();
    }

    /*******************************************/

    clearValue():void{
        this._value = undefined;
        this.valueChange.emit(this._value);
    }

    isValue(value:any):boolean{
        return _.isEqual(value,this._value);
    }
}

export class MultiValueOptions extends ValueOption{
    
    set Value(value:any){
        if(_.isEmpty(value) || (!Array.isArray(this._value) && !Array.isArray(value)) )
            return;


        if(Array.isArray(value))
            this._value = value;
        else
            _.findIndex(this.Value, value)== -1  ? this.addValueMultiSelect(value) : this.removeValueMultiSelect(value);
        
     this.valueChange.emit(this._value);

    };
    get Value():any{
        if(!Array.isArray(this._value))
            this._value = new Array();
        
        return this._value;
    }; 

    /*******************************************/

    constructor() {
        super();
    }

    /*******************************************/

    private addValueMultiSelect(value:any):void{
        this.Value.push(value);
    }

    private  removeValueMultiSelect(value:any):void{
        _.remove(this.Value,(item)=> _.isEqual(item,value));
    }

    clearValue():void{
        this._value = new Array();
        this.valueChange.emit(this._value);
    }
    
    isValue(value:any):boolean{
        return Array.isArray(value)?_.isEqual(value,this.Value):_.findIndex(this.Value,(item)=>_.isEqual(item,value)) != -1;
    }
}