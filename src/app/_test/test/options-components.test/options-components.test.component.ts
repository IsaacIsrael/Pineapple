import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";

import { SettingService } from './../../../setting.service';
import { ExhibitionService } from './../../../exhibition/exhibition.service';

@Component({
  selector: 'options-components',
  templateUrl: './options-components.test.component.html',
  styleUrls: ['./options-components.test.component.css']
})
export class OptionsComponentsTestComponent implements OnInit {

  private _supplierFildSetting:any;
  private _segmentFildSetting:any;
  private _userFildSetting:any;

  /*****************/

  private value1: any = "[Supplier 1 ]";

  private keyword1:string ;

  private value2: any = { id: 1, name: "[Supplier 1 ]"};
  private value3: any = { id: 1, name: "[Supplier 1 ]"};

  private value4: any = { id: 1, name: "[Supplier 1 ]" } ;
  private value5: any = [{ id: 1, name: "[Supplier 1 ]" }, { id: 1, name: "[Exhibitons 1 ]" } ];
  private value6: any = [{ id: 1, name: "[Supplier 1 ]" }];

  private value7: any = "[Segment 5 ]";
  private value8: any = { id: 1, name: "[Segment 1 ]" };
  private value9: any = { id: 1, name: "[Segment 1 ]" };

  private value10: any = { id: 1, name: "[Segment 1 ]" };
  private value11: any = [{ id: 1, name: "[Segment 1 ]" },{ id: 1, name: "[User 1 ]", segment: 1 }];
  private value12: any = [{ id: 1, name: "[Segment 1 ]" }];

  /*********************************/

  private get SupplierFildSetting():any{
    if(_.isEmpty(this._supplierFildSetting))
      this._supplierFildSetting = this._settingService.SupplierOptionSettings;
    
    return this._supplierFildSetting;
  }

  private get SegmentFildSetting():any{
    if(_.isEmpty(this._segmentFildSetting))
      this._segmentFildSetting = this._settingService.SegmentOptionSettings;
    
    return this._segmentFildSetting;
  }

  private get UserFildSetting():any{
    if(_.isEmpty(this._userFildSetting))
      this._userFildSetting = this._settingService.UserOptionSettings;
    
    return this._userFildSetting;
  }

  /*****************/

  private  get autocompleteListFunction():any {
    return this.SupplierFildSetting.ListOption;
  }
  private get autocompleteListArray():Array<any>{
    return this._exhibitionService.Exhibitons;
  }

  private  get selectionListArray():Array<any>{
    return this.SegmentFildSetting.ListOption;
  }
  
  private  get selectiontFunction():any{
    return this.UserFildSetting.ListOption;
  }

  /*********************************/

  constructor(private _exhibitionService: ExhibitionService , private _settingService: SettingService ) { }

  ngOnInit() {
  }

  /*********************************/

  private onKeywordEventHandler(e:any):void{
    this.keyword1 = e;
  }

}
