import {Input, Output, EventEmitter, } from '@angular/core';
import {ValueOption,SingleValueOptions,MultiValueOptions} from './value-options';
import * as _ from "lodash";


export abstract class OptionsComponent {
    
    /******************* Inputs & Outputs ************************/

        @Input()  options: any = [];
        @Input()  optionField: string = "";
        @Input() set multiSelect(value:boolean){
            this._multiSelect = value; 
        }  
        get multiSelect():boolean{
            return this._multiSelect;
        }
        @Input() set value(value: any){
            if(this.validateInputValue(value))
                this.ValueOption.Value = value;
        }
        get value(): any{
            return this.ValueOption.Value;
        };

        @Output() valueChange : EventEmitter<any> = new EventEmitter();

    /******************** Fields ***********************/

        private _multiSelect: boolean = false
        private _valueOption : ValueOption;
    

    /******************* Properties ************************/

        private get ValueOption():ValueOption{
            if( _.isEmpty(this._valueOption))
                this.initializeValueOption();
            
            return this._valueOption;
        }

        protected abstract get FunctionOption():any;

        protected abstract get ArrayOption():any;

        protected set Value(value:any){
            this.ValueOption.Value = value;
        }
        protected get Value():any{
            return this.ValueOption.Value
        }

        protected get Option():any{
            let callback: any;
            
            if(typeof this.options == 'function')
                callback =   this.FunctionOption;
            if(Array.isArray(this.options))
                callback =   this.ArrayOption;
            
            return callback;
        }

    /******************Constructor*************************/
    
        constructor() {}

    /***************** Methods**************************/

        private initializeValueOption(){
            let type = !this.multiSelect ? SingleValueOptions: MultiValueOptions;

            this._valueOption = ValueOption.createInstance(type);
            this._valueOption.ValueChange.subscribe((value)=>this.valueChange.emit(value));
        }
        
        private validateInputValue(value:any):any{
            if(Array.isArray(value))
                _.remove(value,(item)=>_.findIndex(this.Option(item),(option)=> _.isEqual(option,item)) == -1);

            return  !_.isEmpty(value)  
                && ( (this.multiSelect && Array.isArray(value)) || (!this.multiSelect && _.findIndex(this.Option(value),(item)=> _.isEqual(value,item)) != -1) );
        }

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