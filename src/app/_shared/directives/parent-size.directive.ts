import { Directive,OnInit,Input,ElementRef } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as _ from "lodash";

@Directive({
  selector: '[parentSize]'
})
export class ParentSizeDirective implements OnInit {
  /******************* Inputs & Outputs ************************/

    @Input() direction: 'width' = 'width';
    @Input() disableParentSize: boolean = false;

  /******************** Fields ***********************/

    private parent: HTMLElement;
 
  /******************Constructor*************************/

    constructor(private element:ElementRef) { }

    ngOnInit(){
      this.parent = this.element.nativeElement.parentElement;
      this.setMaxWidht();

      Observable.fromEvent(window, 'resize').subscribe((event) => {this.setMaxWidht();});
    }
  
   /***************** Methods**************************/

    private setMaxWidht(){
      if(this.parent && !this.disableParentSize){
        let widht = this.element.nativeElement.style[this.direction];
        
        this.element.nativeElement.style[this.direction] = '0px';
        this.element.nativeElement.style[ 'max'+ _.capitalize(this.direction)]  = this.parent['client' + _.capitalize(this.direction)] + "px";
        this.element.nativeElement.style[this.direction] = widht;    
      }
    }

}
