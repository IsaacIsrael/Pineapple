import { Component, OnInit, HostListener, ElementRef, trigger, state, style, transition, animate, keyframes, HostBinding, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'speed-dial',
  templateUrl: './speed-dial.component.html',
  styleUrls: ['./speed-dial.component.css'],
  animations:[
    trigger('flyInOut',[
      state('in',style({ height:'*',opacity: '1' },)),
      state('out',style({ height:'0', overflow:'hidden',opacity: '0',visibility:'hidden'})),
      transition('out =>in',
        animate('0.3s  ease-in',keyframes([
          style({opacity: 0,transform: 'translateY(-100%)',height:'0',visibility:'visible', offset: 0}),
          style({opacity: 0, transform: 'translateY(-5px)',height:'*',visibility:'visible',  offset: 0.3}),
          style({opacity: 1, transform: 'translateY(0)', height:'*',visibility:'visible',    offset: 1.0})
        ]))
      ),
      transition('in =>out',  
        animate('0.3s  ease-in',keyframes([
          style({opacity: 1, transform: 'translateY(0)', height:'*',    offset: 0}),
          style({opacity: 0, transform: 'translateY(-5px)',height:'*', offset: 0.7}),
          style({opacity: 0, transform: 'translateY(-100%)',height:'0',  offset: 1.0})
        ]))
      )
    ]),
  ],
})
export class SpeedDialComponent  implements OnInit{
   private state : 'in'|'out' = 'out'; 
  @Input() isActive: boolean = false;
  @HostBinding('style.direction') direction : 'rtl' | 'ltr' = "ltr"; 
  @ViewChild('dial')box: ElementRef ;
 

  @HostListener('document:mousedown', ['$event'])
  handleMouseDown(e: MouseEvent) {
    let target = e.srcElement || e.target;

    if (!this.elementRef.nativeElement.contains(e.target))
      this.state = 'out';
  }
  
  constructor(private elementRef: ElementRef) { 
    
  }

  ngOnInit() {
    this.direction  = (window.self.innerWidth/2) > this.elementRef.nativeElement.offsetLeft ? 'ltr':'rtl';
  }

  onOpen(e:MouseEvent){
    this.state = this.state == 'in' ? 'out': 'in' ;
  }
}
