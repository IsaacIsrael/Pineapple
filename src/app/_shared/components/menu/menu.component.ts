import { Component,Input, trigger,state,style,transition,animate ,OnInit } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations:[trigger('slide',[
    state('in',style({transform: 'translate3d(0, 0, 0)'})),
    state('out',style({transform: 'translate3d(-100%, 0, 0)'})),
    transition('in => out', animate('400ms ease-in-out')),
    transition('out => in', animate('400ms ease-in-out'))
  ])],
})
export class MenuComponent implements OnInit {
  @Input()color:any; 
  private menuState:string='out';

  constructor() { 
  }

  ngOnInit() {
  }

  toggleMenu(){
    this.menuState = this.menuState === 'out' ? 'in': 'out';
    console.log(this.menuState);
  }

}
