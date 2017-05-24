import { Component,OnInit, Input, Output, EventEmitter, } from '@angular/core';
import * as _ from "lodash";

import{ OptionsComponent } from '../options-component';

@Component({
  selector: 'auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent extends OptionsComponent  implements OnInit {
  @Input()  placeholder:string = "";
  @Input()  disabled: boolean = false;
  @Output('keyword') keywordChange : EventEmitter<any> = new EventEmitter();
  
  private _keyword: string= "";
  private isFocus:  boolean = false;
  private list :Array<any> = [];

  /*******************************************/
  
  set keyword(value: any){
     this._keyword = this.transformOption(value);
     this.list = this.Option(this._keyword);

     this.keywordChange.emit(this._keyword);
  }
  get keyword():any{
    return this._keyword
  }

  protected  get FunctionOption():any{
    return (value) => this.options(value);
  }

  protected  get ArrayOption():any{
    return (value)=>  this.options.filter((item) => this.transformOption(item).toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) != -1 ? true : false);
  }

  private get IsHideOptions():boolean{
    return !this.isFocus || this.list.length <= 0;
  }

  private get IsSelectOptions():boolean{
    return Array.isArray(this.options)
  }

  /*******************************************/

  constructor() {
    super();
  }

  ngOnInit(){
      this.keyword = !this.multiSelect? this.value : "";
      this.valueChange.subscribe((value)=>this.keyword = !this.multiSelect? value : "");
  }

  /*******************************************/

   protected checkValue(value:any):boolean{

      if(Array.isArray(value))
        _.remove(value,(item)=>_.findIndex(this.Option(this.transformOption(item)),(option)=> _.isEqual(option,item)) == -1);
        
      return  _.isEmpty(value)
              || Array.isArray(value) 
              || _.findIndex(this.Option(this.transformOption(value)),(item)=> _.isEqual(value,item)) != -1;
   }

   private checkKeyword():void{

      let validate = (item) =>_.isEqual(this.keyword,this.transformOption(item) );

      if(_.findIndex(this.Option(this.transformOption(this.keyword)),(item)=>validate(item) ) != -1)
        return;

      let value = this.keyword;
      this.clearValue();
      this.keyword = value;
   }

   private isSelected(value):boolean{
      return this.isValeu(value);
   }

  /*******************************************/
 
  private onFocusEventHandler(e:Event,arg:any):void{
    this.isFocus = arg;

    if(!this.multiSelect && !arg)
      this.checkKeyword();  
  }

  private onKeyUpEventHandler(e:KeyboardEvent):void{
      this.isFocus= true;
      let target: any = e.target;
         
      setTimeout( ()=>this.keyword =target.value,500);
  }

  private onSelectOptionEventHandler(e:MouseEvent, args: any):void{
      this.value = args;
  }

  private onClearEventHandler(e:MouseEvent):void{
    if(!this.disabled){
      this.clearValue();
    }
  }

  private onRemoveEventHandler(e:MouseEvent, args: any):void{
    if(!this.disabled)
      this.value = args;
  }
  
  private onKeyDownBackspaceEventHandler(e:KeyboardEvent):void{
      if(this.multiSelect && _.isEmpty(this.keyword))
        this.value = _.last(this.value);
  }

}
