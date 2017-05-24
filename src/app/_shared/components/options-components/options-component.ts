import {Input, Output, EventEmitter, } from '@angular/core';
import {ValueOption,SingleValueOptions,MultiValueOptions} from './value-options';
import * as _ from "lodash";


export abstract class OptionsComponent {
    
    @Input()  options: any = [];
    @Input()  optionField: string = "";
    @Output() valueChange : EventEmitter<any> = new EventEmitter();

    private _multiSelect: boolean = false
    private _valueOption : ValueOption;
    

    /*******************************************/

    @Input() set multiSelect(value:boolean){
        this._multiSelect = value; 
    }  
    get multiSelect():boolean{
        return this._multiSelect;
    }

    @Input() set value(value: any){
        if(this.checkValue(value) )
            this.ValueOption.Value = value;
    }
    get value(): any{
        return this.ValueOption.Value;
    };

    private get ValueOption():ValueOption{
        if( _.isEmpty(this._valueOption))
            this.initializeValueOption();
        
        return this._valueOption;
    }

    protected get Option():any{
        let callback: any;
        
        if(typeof this.options == 'function')
            callback =   this.FunctionOption;
        if(Array.isArray(this.options))
            callback =   this.ArrayOption;
        
        return callback;
    }

    protected abstract get FunctionOption():any;

    protected abstract get ArrayOption():any;

    /*******************************************/
    
    constructor() {}

    /*******************************************/

    private initializeValueOption(){
        let type = !this.multiSelect ? SingleValueOptions: MultiValueOptions;

        this._valueOption = ValueOption.createInstance(type);
        this._valueOption.ValueChange.subscribe((value)=>this.valueChange.emit(value));
    }
    
    protected abstract checkValue(value:any):any;

    protected clearValue():void{
        this.ValueOption.clearValue();
    }

    protected transformOption(option: any): any{
        option = _.isEmpty(option) ? "": option;
        return (_.isEmpty(this.optionField) || _.isEmpty(option[this.optionField])) ? option:  option[this.optionField];
    }  

    protected isValeu(value:any):boolean{
        return this._valueOption.isValue(value);
    }
  
}