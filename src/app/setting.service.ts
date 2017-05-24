import { Injectable } from '@angular/core';
import * as _ from "lodash";

import { UserRunningDateService } from './_test/running-date/user.running-date.service';

import { SupplierService } from './supplier/supplier.service';
import { UserService } from './user/user.service';


@Injectable()
export class SettingService {
    private _segmentList: Array<any>  = new Array();
   
    /*********************************************************/

    get Locale():string{
      return "pt-BR";
    }

    get SupplierOptionSettings():any{
      return {
        ListOption:(value:string) =>  this._supplierService.getSupplierOptions(value),
        FieldOption:"name",
        MultiSelect:true,
        Placeholder:"Fornecedor",
      }
    }

    get SegmentOptionSettings():any{
       
       return {
        ListOption: this._segmentList,
        FieldOption:"name",
        Placeholder:"All",
        Visibile:_.isEmpty(this.getMySegment()),
      }
    }

    get UserOptionSettings():any{
       return {
        ListOption:() =>  this._userService.getAllUsers(),
        FieldOption:"name",
        Placeholder:"All",
      }
    }

    /*********************************************************/
  
    constructor(private fakeDate: UserRunningDateService  ,private _userService:UserService ,
                private _supplierService: SupplierService) { 
        this._segmentList = this.fakeDate.getAllSegments();
    }

    /*********************************************************/

    getSegment(id:number){
      return _.find(this._segmentList, (item)=> item.id==id); 
    }

    getMySegment(){
      return this.getSegment(2);
      // return undefined;
    }
}