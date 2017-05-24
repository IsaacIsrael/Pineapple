import { Injectable } from '@angular/core';

import { SupplierRunningDateService } from './../_test/running-date/supplier.running-date.service';


@Injectable()
export class SupplierService {
 
  constructor(private fakeData:SupplierRunningDateService) {}
  
  /********************************/

  getSuppliers():Array<any>{
    return this.fakeData.getAllContacs();
  }

  getSupplierOptions(keyword :string):Array<any>{
    return this.fakeData.getSuppliers(keyword);
  }

  getUserSupplerOptions(segment:any):Array<any>{
    return this.fakeData.getContacUsers(segment?segment.id:undefined);
  }
}
