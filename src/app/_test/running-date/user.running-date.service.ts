import { Injectable } from '@angular/core';

@Injectable()
export class UserRunningDateService {
  private MAX_NUMBER: number = 50;

  private _segmentList: Array<any>  = new Array();
  private _user: Array<any> =  new Array();

  constructor() { 
    this.createData();
  }

  /********************************/

  private createData(): void{

    let id = 1;
    
    for (let index =1 ;index <= this. MAX_NUMBER;++index){
      this._user.push({
            id:index ,
            name:'[User ' + index +' ]',
            segment: id,
        });

      if(index%10===0)
      {
        this._segmentList.push({
          id:id ,
          name:'[Segment ' + id +' ]'
        });  
        ++id
      }  
    }
  }


  getAllSegments():Array<any>{
    return this._segmentList;
  }

  getAllUsers():Array<any>{
    return this._user;
  }
      
  getUsers(segment:number):Array<any>{
        return this._user.filter((v) =>v.segment == segment);
  }

}
