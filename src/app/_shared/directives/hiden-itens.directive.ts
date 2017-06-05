import { Directive,Input,HostListener,ElementRef, OnInit , AfterViewChecked } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Directive({
  selector: '[hidenItens]'
})
export class HidenItensDirective implements OnInit ,AfterViewChecked  {
  @Input() direction: 'first'|'last' = 'first';

  /*******************************************/

  constructor(private _elementRef:ElementRef) { }

  ngOnInit() {
    Observable.fromEvent(window, 'resize').subscribe((event) => this.setItens());
  }

  ngAfterViewChecked(){
     this.setItens();
  }

  /*******************************************/

  private setItens():void {
    if(this._elementRef.nativeElement.children.length  > 0)
    {
        let parentWidth = this._elementRef.nativeElement.clientWidth;
        let chieldWidth =  this._elementRef.nativeElement.children[0].clientWidth
        let numberOfItens = this._elementRef.nativeElement.children.length - Math.floor(parentWidth/chieldWidth);

        if(this.direction == 'first')
          this.hidenFirstItens(numberOfItens);
    }
  }

  private hidenFirstItens(numberOfItens:number):void{

    for(let index=0;index<this._elementRef.nativeElement.children.length;++index){
        
        let item = this._elementRef.nativeElement.children[index];

        if(index < numberOfItens)
          this.hideItem(item);
        else
          this.showItem(item);
    }

  }

  private hideItem(item:HTMLElement):void{
    item.style['position']='absolute';
    item.style['visibility']='hidden';
  }
  
  private showItem(item:HTMLElement):void{
    item.style['position']='inherit';
    item.style['visibility']='visible';
  }


}
