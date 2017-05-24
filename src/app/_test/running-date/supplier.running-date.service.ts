import { Injectable } from '@angular/core';

import { UserRunningDateService } from './user.running-date.service';

@Injectable()
export class SupplierRunningDateService {

  private MAX_NUMBER: number = 10000;

  private suppliers: Array<any> =  new Array(); 
  private contacts: Array<any> = new Array();
  private contacsUser: Array<any> = new Array();

  constructor(private _user:UserRunningDateService) { 
    this.createData();
    this.setUser();
  }

  private createData(): void{
    let id = 1 ;

    for (let index =1 ;index <= this.MAX_NUMBER;++index){
      this.contacts.push({
            id:id ,
            name:'[Supplier ' + id +' ]', 
            patner: id%2===0, 
            date:'[Supplier Create Date]', 
            contact:'[Contact name '+ (index%3) + '] - [Contact Create Date]', 
            notes:id%2===0, 
            favorits:id%2===0
        });

      if(index%3===0)
      {
        this.suppliers.push({
          id:id ,
          name:'[Supplier ' + id +' ]'
        });  
        ++id
      }  
      
    }
  
  }

  private setUser(){
    let list =  this._user.getAllUsers();
  
    for(let index =0 ;index < list.length;index += 5)
        this.contacsUser.push(list[index]);
  }

  getSuppliers(keyword:string):Array<any>{
    if( this.suppliers.length === 0 || keyword === undefined || keyword.trim() ==='')
          return [];
        
        return this.suppliers
                  .filter((v) =>v.name.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) != -1 ? true : false)
                  .slice(0,5);
  }

  getAllContacs(){
    return this.contacts;
  }

  getContacUsers(segmentID:Number):Array<any>{

     if( this.contacsUser.length === 0 || segmentID === undefined)
          return this.contacsUser;

    return this.contacsUser.filter((item) => item.segment == segmentID);
  }

}
