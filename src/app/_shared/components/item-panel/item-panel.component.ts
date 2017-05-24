import { Directive, Component, ContentChild, ViewChild, HostBinding, ElementRef, TemplateRef, Input, OnInit, AfterContentInit, style } from '@angular/core';


@Directive({
	selector: 'list-view'
})
export class ListViewComponent {
  @ContentChild(TemplateRef) itemTemplate;
  
  ngAfterContentInit() {
    this.itemTemplate;
  }
}

/*****************************/

@Directive({
	selector: 'grid-view'
})
export class GridViewComponent {
  @ContentChild(TemplateRef) itemTemplate;
  
  ngAfterContentInit() {
    this.itemTemplate;
  }
}

/*****************************/

@Component({
  selector: 'item-panel',
  templateUrl: './item-panel.component.html',
  styleUrls: ['./item-panel.component.css']
})
export class ItemPanelComponent implements OnInit, AfterContentInit {
  @Input() collections: Array<any>= [];
  
  @Input() infiniteScrollDownDistance: number = 5;
  @Input() infiniteScrollUpDistance: number = 5;
  @Input() infiniteScrollThrottle: number = 10;
  @Input('virtualizationLength') length: number = 0;
  @Input('virtualizationIncrese') increse: number = 0;
  
  @Input('') totalDescription: string = "Total";
  @Input('') emptyListDescriptionDescription: string = "0 Itens";
 
  private list: Array<any> =[];
  private position: number;
  private scrollPorcentage: number = 0;
  
 

  private emptyViewHeight:string = 'calc( 500px )';
  private componentView: ElementRef;
  private view: 'grid'|'list';

  @ContentChild(ListViewComponent) listviewComponent;
  @ContentChild(GridViewComponent) gridviewComponent;
  
  /********************************************************************/

  @ViewChild ('gridview') set gridView(value:ElementRef){
     if(!value)
      return;

    this.componentView = value;
    value.nativeElement.style["max-height"] = this.calcHeight('grid');
    value.nativeElement.scrollTop =  (value.nativeElement.scrollHeight  * this.scrollPorcentage)/ 100
    
  };

  @ViewChild ('listview') set listView(value:ElementRef){
    if(!value)
      return;
      
    this.componentView = value;
    value.nativeElement.style["max-height"] = this.calcHeight('list');
    value.nativeElement.scrollTop =  (value.nativeElement.scrollHeight  * this.scrollPorcentage)/ 100
    
    
  } ;

  private set View(value:'grid'| 'list'){
      this.view = value;
      this.scrollPorcentage = (this.componentView.nativeElement.scrollTop * 100 )  / this.componentView.nativeElement.scrollHeight  ;
  }
 
  /********************************************************************/

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.length =  this.length + (this.collections.length % (this.length + this.increse))
    this.position =  this.length;
    this.list = this.collections.slice(0,this.position);
    this.totalDescription =  this.totalDescription + ' ' + this.collections.length;
    
  }

  ngAfterContentInit(){
     this.view = !!this.listviewComponent ? 'list' : this.view;
     this.view = !!this.gridviewComponent ? 'grid' : this.view;
  }

  ngAfterViewInit(){
    setTimeout(() => { this.emptyViewHeight = this.calcHeight('empty');}, 1);
  }

  /********************************************************************/
    private calcHeight(container: 'grid'| 'list' | 'empty'):string{

        let elementHeight:string      = this.elementRef.nativeElement.style['height'].replace('calc(','').replace(')','').trim()
        let headerHeight:string       =  this.elementRef.nativeElement.getElementsByClassName('header')[0].clientHeight +'px'
        headerHeight       =  headerHeight  == '0px' ? this.elementRef.nativeElement.children[0].children[0].clientHeight + 'px': headerHeight ;
        
        let totalHeight:string        = container != 'empty' ? this.elementRef.nativeElement.getElementsByClassName('total-container')[0].clientHeight +'px': '0px';
        let headerListHeight:string   =  container == 'list' ?  this.componentView.nativeElement.parentElement.children[0].clientHeight +'px' : '0px';

        return 'calc( '  + elementHeight + ' - ' +  headerHeight + ' - ' +  totalHeight + ' - ' +  headerListHeight +' )';
    }
  
  
  private  increaseList(range:{start:number,end:number}):void{
    
    if(range.end > this.collections.length)
      return;
    
    this.list = this.list.splice(this.increse);
    this.list = this.list.concat(this.collections.slice(range.start,range.end));
    this.position = range.end;

  }

  private  decreaseList(range:{start:number,end:number}):void{
    
    if(range.start < 0)
          return;
    
    this.list = this.list .slice(0, this.length-this.increse) ;
    this.list =  this.collections.slice(range.start,range.end).concat(this.list);
    this.position = range.start + this.length;

  }

  /********************************************************************/
  onClickEventHandler(e:MouseEvent,arg:any):void{
    this.View = arg;
  }

  onScrollDownEventHandler(e:any):void{
    let start = this.position;
    let end  = start + this.increse;

    this.increaseList({start:start,end:end});

  }

  onScrollUpEventHandler(e:any):void{

    let end  = (this.position - this.length) 
    let start = end - this.increse ;
    
    this.decreaseList({start:start,end:end});
    
  }

}
