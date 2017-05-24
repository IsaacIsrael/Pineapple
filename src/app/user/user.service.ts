import { Injectable } from '@angular/core';

import { UserRunningDateService } from './../_test/running-date/user.running-date.service';

@Injectable()
export class UserService {

  constructor(private fakeDate: UserRunningDateService) {  }

  getAllUsers():Array<any>{
    return this.fakeDate.getAllUsers();
  }

}
