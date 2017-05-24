import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";

import { SettingService } from './../../../setting.service';
import { SupplierService } from './../../../supplier/supplier.service';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.test.component.html',
  styleUrls: ['./search-box.test.component.css']
})
export class SearchBoxTestComponent implements OnInit {

  private _supplierFildSetting:any;
  private _segmentFildSetting:any;
  private _userFildSetting:any;

  private supplierSearch: Array<any> ;
  private supplierKeyword:string;
  private _segmentSearch: any ;
  private _userSearch: any ;

   
  /*****************************************************************/

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
    if(_.isEmpty(this._userFildSetting)){
      this._userFildSetting = this._settingService.UserOptionSettings;
      this._userFildSetting.ListOption = () =>this._supplierService.getUserSupplerOptions(this._segmentSearch)
    }
    
    return this._userFildSetting;
  }

  /*********************************/

  private set SegmentSearch(value:any){
    this._segmentSearch = value;

    if( !_.isEmpty(this._segmentSearch) && !_.isEmpty(this._userSearch)   
        && this._segmentSearch.id != this._userSearch.segment)
      this._userSearch = undefined;
    
  }
  private get SegmentSearch():any{
    return this._segmentSearch;
  }

  private set UserSearch(value:any){
    this._userSearch = value;

    if(this._userSearch)
      this._segmentSearch = this._settingService.getSegment(this._userSearch.segment)
  }
  private get UserSearch():any{
    return this._userSearch
  }
   
  /*****************************************************************/

  constructor(private _settingService: SettingService , private _supplierService:SupplierService) { }

  ngOnInit() {
    this._segmentSearch = this._settingService.getMySegment();
  }

  /*****************************************************************/

  private onSupplierKeywordEventHandler(e:any):void{
    this.supplierKeyword =e;
  }

}
