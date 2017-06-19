import { Directive,OnInit,Input, HostListener, ElementRef} from '@angular/core';
import * as _ from "lodash";

@Directive({
  selector: 'input[auto-size]',
})
export class AutoSizeDirective implements OnInit {
  /******************* Inputs & Outputs ************************/
   
    @Input() direction: 'width' = 'width';
    @Input() disableAutoSize: boolean = false;
  
  /*******************Host Listeners************************/

    @HostListener('input',['$event'])
    onInputHostListener(e:Event): void {
        this.ajustSize();
    }

  /******************Constructor*************************/

    constructor(private element:ElementRef) { }

    ngOnInit(){
      this.ajustSize();
    }
 
  /***************** Methods**************************/
  
    private ajustSize():void{
      if(!this.disableAutoSize){
        this.element.nativeElement.style[this.direction] = 'auto';
        this.element.nativeElement.style[this.direction] = this.element.nativeElement['scroll' + _.capitalize(this.direction)]  + "px";
      }
    }

}
