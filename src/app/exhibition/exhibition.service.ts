import { Injectable } from '@angular/core';

@Injectable()
export class ExhibitionService {

  private _exhibitons: Array<any> = new Array();

  /********************************/

  get Exhibitons(): Array<any> {
    return this._exhibitons;
  }

  /********************************/

  constructor() {
    this.createData();
   }

  /********************************/

  private MAX_NUMBER: number = 20;

  private createData(): void{
    for (let index =1 ;index <= this.MAX_NUMBER;++index){
      this._exhibitons.push({
            id:index ,
            name:'[Exhibitons ' + index +' ]', 
        });
    }
  }
}
