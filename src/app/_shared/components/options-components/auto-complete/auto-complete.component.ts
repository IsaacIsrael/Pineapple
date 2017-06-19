import { Component,OnInit, Input, Output, EventEmitter, } from '@angular/core';
import * as _ from "lodash";

import{ OptionsComponent } from '../options-component';

@Component({
  selector: 'auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent extends OptionsComponent  implements OnInit {
  /******************* Inputs & Outputs ************************/
    
    @Input()  placeholder:string = "";
    @Input()  disabled: boolean = false;
    @Output('keyword') keywordChange : EventEmitter<any> = new EventEmitter();
  
  /******************** Fields ***********************/
  
    private _keyword: string= "";
    private isFocus:  boolean = false;
    private list :Array<any> = [];

  /******************* Properties ************************/
  
    private set keyword(value: any){
      this._keyword = this.transformOption(value);
      this.list = this.Option(this._keyword);
      this.keywordChange.emit(this._keyword);
    }
    private get keyword():any{
      return this._keyword
    }

    private get IsHideOptions():boolean{
      return !this.isFocus || this.list.length <= 0;
    }

    private get IsSelectOptions():boolean{
      return Array.isArray(this.options)
    }

    protected  get FunctionOption():any{
      return (value) => this.options(this.transformOption(value));
    }

    protected  get ArrayOption():any{
      return (value)=> this.options.filter((item) =>this.transformOption(item).toLocaleLowerCase().indexOf(this.transformOption(value).toLocaleLowerCase()) != -1 ? true : false );
    }

  /******************Constructor*************************/

    constructor() {
      super();
    }

    ngOnInit(){
        this.keyword = !this.multiSelect? this.Value : "";
        this.valueChange.subscribe((value)=>this.keyword = !this.multiSelect? value : "");
    }

  /***************** Methods**************************/

    private isSelected(value):boolean{
      return this.isValeu(value);
    }

  /******************Events*************************/
 
    private onFocusEventHandler(e:Event,arg:any):void{
      this.isFocus = arg;
    }

    private onKeyUpEventHandler(e:KeyboardEvent):void{
        this.isFocus= true;
        let target: any = e.target;
          
        setTimeout( ()=>this.keyword =target.value,500);
    }

    private onSelectOptionEventHandler(e:MouseEvent, args: any):void{
        this.Value = args;
    }

    private onClearEventHandler(e:MouseEvent):void{
      if(!this.disabled){
        this.clearValue();
      }
    }

    private onRemoveEventHandler(e:MouseEvent, args: any):void{
      if(!this.disabled)
        this.Value = args;
    }
    
    private onKeyDownBackspaceEventHandler(e:KeyboardEvent):void{
        if(this.multiSelect && _.isEmpty(this.keyword))
          this.Value = _.last(this.Value);
    }
}
