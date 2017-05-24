import { Component, Input, HostListener, ElementRef } from '@angular/core';
import * as _ from "lodash";

import { Slide } from '../../animations/slideIn-slideOut.animation'

@Component({
  selector: 'togglet-panel',
  templateUrl: './togglet-panel.component.html',
  styleUrls: ['./togglet-panel.component.css'],
   animations: [ Slide(600,) ],
})
export class ToggletPanelComponent {
  @Input() isOpenOnlyFocus : boolean = false;

  private state: boolean = false;

  /*******************************************/

  @HostListener('document:mousedown', ['$event'])
  onMouseDownHostListener(e: any):void {
    if (this.isOpenOnlyFocus && _.findIndex(e.path,(item)=>_.isEqual(item,this.elementRef.nativeElement)) == -1 )
      this.state = false;
  }

  constructor(private elementRef:ElementRef) { }

  /*******************************************/

  private changeStatus():void{
    this.state = !this.state;
  }

  /*******************************************/
  
  private onClickEventHandler(e:MouseEvent):void{
    this.changeStatus();
  }

}
