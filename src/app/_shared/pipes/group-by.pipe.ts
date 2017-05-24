import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  private tryForEach (fields:Array<string>, callback:any){
         fields? fields.forEach((field) => callback(field)): undefined;
  }
  
  transform(value: any, args: string , fields?:Array<string>): any {
    
    let groups ={}
    
    value.forEach((item)=>{
      let group = item[args];
      
      if(!groups[group])
      {
        groups[group] = { itens : []};
        groups[group][args] = item[args];
        this.tryForEach( fields, (field)=>  groups[group][field]= item[field]) ;
      }

      delete item[args];
      this.tryForEach( fields, (field)=> delete item[field] ) ;
     

      groups[group].itens.push(item);
    });

    return Object.keys(groups).map((key)=>{ return groups[key] });
  }

}
