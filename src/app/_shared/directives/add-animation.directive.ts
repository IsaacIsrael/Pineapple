import { Directive, Input,HostBinding, ElementRef,Renderer , animate, style } from '@angular/core';
import * as _ from "lodash";

@Directive({
  selector: '[addAnimation]',
  host: {
      '[@collapse]': 'true'
  }
})
export class AddAnimationDirective {
  
  @Input() set animation(value:any){
   this._animation = value;
  }

  @Input() set status(value:any){
    this.animate(this._status,value)
    this._status = value;
  }

  private _animation :any = undefined;
  private _status: any = undefined;

  @HostBinding('@collapse') get slideIn() {
    console.log("cheguei aqui")
    return true;
  }

  constructor(private _elementRef:ElementRef , private _renderer:Renderer  ) { }

  ngOnInit(){
      let startPos ="-100%";
      // this._elementRef.nativeElement.animate(
      //   [
      //     {transform: "translateX(" + startPos + ")"},
      //     {transform: "translateX(0)"},
      //   ], 
      //   {
      //     duration: 300,
      //     easing :'ease-in-out'
      //   }
      // );
     

  //   this._renderer.invokeElementMethod(
  //   this._elementRef.nativeElement, 
  //   'animate', 
  //   [
  //     [
  //       {transform: "translateX(" + startPos + ")"},
  //       {transform: "translateX(0)"},
  //     ],
  //     {
  //       duration: 500,
  //       easing :'ease-in-out'
  //     }
  //   ]
  // );
  }

  private animate(oldStatus:any , newStatus:any):void{
    // console.log("Status Antigo " + oldStatus)
    // console.log("Status Novo " + newStatus);
    // console.log(this._animation.definitions);

    let stateDeclaration =  _.filter(this._animation.definitions, (item:any)=> _.isEqual(item.stateNameExpr,_.toString(newStatus)) );
    let stateTrasition =  _.filter(this._animation.definitions, (item:any)=>_.isEqual(this.trim(item.stateChangeExpr),this.trim(oldStatus)+"=>"+ this.trim(newStatus)));
    
    if(stateDeclaration.length == 1 && stateTrasition.length == 1){
      console.log(stateDeclaration)
      console.log(stateTrasition[0].steps)
    }
  }

  private startAnimation(trasitions,style){
    console.log(trasitions)
    console.log(style)
  }

  private trim(value:any):string{
    return _.join(_.split(value,' '),'')
  }

}
