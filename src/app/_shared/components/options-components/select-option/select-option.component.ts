import { Component, Input, HostListener, ElementRef } from '@angular/core';
import * as _ from "lodash";

import{ OptionsComponent } from '../options-component';

@Component({
  selector: 'select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.css']
})
export class SelectOptionComponent extends OptionsComponent  {
    @Input()  placeholder:string = "";
    @Input()  disabled: boolean = false;

    private isFocus:  boolean = false;
    private list :Array<any> = [];
    
    
    /*******************************************/

    private get IsValueEmpty():boolean{
        return  _.isEmpty(this.value);
    }

    private get Placeholder():string{
      return this.IsValueEmpty ? this.placeholder : this.transformOption(this.value);
    }

    private get isVisibelPlaceholder():boolean{
      return  !this.multiSelect || (this.IsValueEmpty && this.multiSelect) ;
    }

    protected  get FunctionOption():any{
        return (filter)=>this.options();
    };

    protected  get ArrayOption():any{
      return (filter)=>this.options;
    }

    /*******************************************/

    @HostListener('document:mousedown', ['$event'])
    onMouseDownHostListener(e: MouseEvent) {
      let target = e.srcElement || e.target;

      if (!this.elementRef.nativeElement.contains(e.target))
        this.isFocus = false;
    }

    constructor(private elementRef:ElementRef) { 
      super();
    }

    /*******************************************/

    protected checkValue(value:any):boolean{
      if(Array.isArray(value))
       _.remove(value,(item)=>_.findIndex(this.Option(),(option)=> _.isEqual(option,item)) == -1);
     
      return  _.isEmpty(value) 
            || Array.isArray(value) 
            || _.findIndex(this.Option(),(item)=> _.isEqual(value,item)) != -1;
    }

    private isSelected(value):boolean{
      return this.isValeu(value);
    }

    /*******************************************/

    private onFocusEventHandler(e:Event,arg:any):void{
        if(!this.disabled){
          this.isFocus = arg;
          this.list = this.Option();
        }
    }

    private onClearEventHandler(e:MouseEvent):void{
      if(!this.disabled)
          this.clearValue();
    }

    private onRemoveEventHandler(e:MouseEvent, args: any):void{
       if(!this.disabled)
          this.value = args;
    }

    private onSelectOptionEventHandler(e:MouseEvent, args: any):void{
        this.value = args;
        this.isFocus = false;
    }


}
