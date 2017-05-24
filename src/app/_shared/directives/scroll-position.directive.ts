import { Directive, Input, AfterViewInit ,ElementRef } from '@angular/core';

@Directive({
  selector: '[scrollPosition]'
})
export class ScrollPositionDirective implements AfterViewInit{
  
    constructor(private _element:ElementRef) {}

    ngAfterViewInit(){
     this.setPosition();
     console.log(this._element);
    }

    private setPosition(){
       this._element.nativeElement.scrollTop = this._element.nativeElement.scrollHeight;
    }

}
