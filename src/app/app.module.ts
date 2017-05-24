
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { TestModule } from './_test/test.module';
import { SupplierModule } from './supplier/supplier.module';

// import { MenuComponent } from './shared/components/menu/menu.component';
// import { DatePickerComponent } from './_shared/components/date-picker/date-picker.component';
// import { SpeedDialComponent } from './shared/components/speed-dial/speed-dial.component';

import { SettingService } from './setting.service';
import { UserService } from './user/user.service';
import { ExhibitionService } from './exhibition/exhibition.service';

@NgModule({
  declarations: [
    AppComponent,
    
    // MenuComponent,
    // DatePickerComponent,
    // SpeedDialComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    TestModule, 
    SupplierModule,
  ],
  providers: [
    SettingService,
    ExhibitionService,
    UserService,
     {
      provide: LOCALE_ID,
      deps:[SettingService],
      useFactory:(settingService) => settingService.Locale 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
