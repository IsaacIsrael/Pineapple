import { Component, Input, HostListener, ElementRef } from '@angular/core';

import { Slide } from '../../../animations/slideIn-slideOut.animation'
import * as _ from "lodash";

import{ OptionsComponent } from '../options-component';

@Component({
  selector: 'select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.css'],
  animations: [ Slide(800,-15) ],
})
export class SelectOptionComponent extends OptionsComponent  {
  /******************* Inputs & Outputs ************************/ 
  
    @Input()  placeholder:string = "";
    @Input()  disabled: boolean = false;

  /******************** Fields ***********************/

    private isFocus:  boolean = false;
    private list :Array<any> = [];
    
  /******************* Properties ************************/

    private get IsValueEmpty():boolean{
        return  _.isEmpty(this.Value);
    }

    private get Placeholder():string{
      return this.IsValueEmpty ? this.placeholder : this.transformOption(this.Value);
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

  /*******************Host Listeners************************/

    @HostListener('document:mousedown', ['$event'])
    onMouseDownHostListener(e: MouseEvent) {
      let target = e.srcElement || e.target;
      
      if ( this.isFocus && !this.elementRef.nativeElement.contains(e.target))
        this.isFocus = false;
    }
  
  /******************Constructor*************************/

    constructor(private elementRef:ElementRef) { 
      super();
    }

  /***************** Methods**************************/

    private isSelected(value):boolean{
      return this.isValeu(value);
    }

  /******************Events*************************/

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
          this.Value = args;
    }

    private onSelectOptionEventHandler(e:MouseEvent, args: any):void{
        this.Value = args;
        
        if(!this.multiSelect)
          this.isFocus =  false;
    }


}
