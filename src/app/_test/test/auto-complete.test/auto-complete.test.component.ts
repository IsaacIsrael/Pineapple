import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";

import { SettingService } from './../../../setting.service';
import { ExhibitionService } from './../../../exhibition/exhibition.service';

@Component({
  selector: 'auto-complete-test',
  templateUrl: './auto-complete.test.component.html',
  styleUrls: ['./auto-complete.test.component.css']
})
export class AutoCompleteTestComponent {

  private value1: any = "[Supplier 1 ]";
  private value2: any = { id: 1, name: "[Supplier 1 ]"};
  private value3: any = { id: 1, name: "[Supplier 1 ]"};

  private value4: any = { id: 1, name: "[Supplier 1 ]" } ;
  private value5: any = [{ id: 1, name: "[Supplier 1 ]" }, { id: 1, name: "[Exhibitons 1 ]" } ];
  private value6: any = [{ id: 1, name: "[Supplier 1 ]" }];

  private keyword1:string ;

   private _supplierFildSetting:any;
  
  /*******************************************/
   private get SupplierFildSetting():any{
    if(_.isEmpty(this._supplierFildSetting))
      this._supplierFildSetting = this._settingService.SupplierOptionSettings;
    
    return this._supplierFildSetting;
  }

  private  get autocompleteListFunction():any {
    return this.SupplierFildSetting.ListOption;
  }

  private get autocompleteListArray():Array<any>{
    return this._exhibitionService.Exhibitons;
  }

  /*******************************************/

  constructor(private _exhibitionService: ExhibitionService , private _settingService: SettingService) { }

 /*******************************************/

  private onKeywordEventHandler(e:any):void{
    this.keyword1 = e;
  }

}
