import { Directive,OnInit,Input,ElementRef } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Directive({
  selector: '[parentSize]'
})
export class ParentSizeDirective implements OnInit {
  @Input() direction: 'width' = 'width';
  @Input() disableParentSize: boolean = false;

  private parent: HTMLElement;

  /*******************************************/

  private get capitalizeDirection():String{
    return this.direction.replace(/\b\w/g, l => l.toUpperCase());
  }

  /*******************************************/

  constructor(private element:ElementRef) { }

  ngOnInit(){
    this.parent = this.element.nativeElement.parentElement;
    this.setMaxWidht();

    Observable.fromEvent(window, 'resize').subscribe((event) => {this.setMaxWidht();});
  }
  
  /*******************************************/

   private setMaxWidht(){
      if(this.parent){
        let widht = this.element.nativeElement.style[this.direction];
        
        this.element.nativeElement.style[this.direction] = '0px';
        this.element.nativeElement.style[ 'max'+ this.capitalizeDirection]  = this.parent['client' + this.capitalizeDirection] + "px";
        this.element.nativeElement.style[this.direction] = widht;    
    }
  }

}
