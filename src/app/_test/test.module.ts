import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from './../_shared/shared.module';

import { OptionsComponentsTestComponent } from './test/options-components.test/options-components.test.component';
import { SearchBoxTestComponent } from './test/search-box.test/search-box.test.component';
import { TestComponent } from './test/test.component';

import { SupplierRunningDateService } from './running-date/supplier.running-date.service';
import { UserRunningDateService } from './running-date/user.running-date.service';
import { DateRangePickerTestComponent } from './test/date-range-picker.test/date-range-picker.test.component';
import { SelectOptionsTestComponent } from './test/select-options.test/select-options.test.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
       
        SharedModule, 
    ],
    exports: [TestComponent],
    declarations: [
        TestComponent,
        OptionsComponentsTestComponent,
        DateRangePickerTestComponent,
        SelectOptionsTestComponent,
        SearchBoxTestComponent,
    ],
    providers: [
        SupplierRunningDateService,
        UserRunningDateService
    ],
})
export class TestModule { }