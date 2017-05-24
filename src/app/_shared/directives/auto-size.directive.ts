import { Directive,OnInit,Input, HostListener, ElementRef} from '@angular/core';

@Directive({
  selector: 'input[auto-size]',
})
export class AutoSizeDirective implements OnInit {
  @Input() direction: 'width' = 'width';
  @Input() disableAutoSize: boolean = false;
  
  /*******************************************/

  private get capitalizeDirection():String{
    return this.direction.replace(/\b\w/g, l => l.toUpperCase());
  }
  
  /*******************************************/
 
  @HostListener('input',['$event'])
  onInputHostListener(e:Event): void {
      this.ajustSize();
  }

  @HostListener('focus',['$event'])
  onFocusHostListener(e:Event): void {
      if(this.element.nativeElement.value == "")
        this.ajustSize();
  }

  @HostListener('blur',['$event'])
  onBlurHostListener(e:Event): void {
      setTimeout(()=>{ this.ajustSize();},1);
  }

  constructor(private element:ElementRef) { }

  ngOnInit(){
    this.ajustSize();
  }
 
  /*******************************************/
  
  private ajustSize():void{
    if(!this.disableAutoSize){
      this.element.nativeElement.style[this.direction] = 'auto';
      this.element.nativeElement.style[this.direction] = this.element.nativeElement['scroll' + this.capitalizeDirection]  + "px";
    }
  }

}
