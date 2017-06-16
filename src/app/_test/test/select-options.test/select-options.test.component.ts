import { Component } from '@angular/core';
import * as _ from "lodash";

import { SettingService } from './../../../setting.service';

@Component({
  selector: 'select-options-test',
  templateUrl: './select-options.test.component.html',
  styleUrls: ['./select-options.test.component.css']
})
export class SelectOptionsTestComponent{

  private value1: any = "[Segment 5 ]";
  private value2: any = { id: 1, name: "[Segment 1 ]" };
  private value3: any = { id: 1, name: "[Segment 1 ]" };

  private value4: any = { id: 1, name: "[Segment 1 ]" };
  private value5: any = [{ id: 1, name: "[Segment 1 ]" },{ id: 1, name: "[User 1 ]", segment: 1 }];
  private value6: any = [{ id: 1, name: "[Segment 1 ]" }];

  private _segmentFildSetting:any;
  private _userFildSetting:any;

  /*******************************************/

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

  private  get selectionListArray():Array<any>{
    return this.SegmentFildSetting.ListOption;
  }
  
  private  get selectiontFunction():any{
    return this.UserFildSetting.ListOption;
  }

  /*******************************************/

  constructor(private _settingService: SettingService) { }

}
