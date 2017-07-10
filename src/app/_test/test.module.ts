import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from './../_shared/shared.module';

import { ToggletPanelTestComponent } from './test/togglet-panel.test/togglet-panel.test.component';
import { AutoCompleteTestComponent } from './test/auto-complete.test/auto-complete.test.component';
import { SelectOptionsTestComponent } from './test/select-options.test/select-options.test.component';
import { DateRangePickerTestComponent } from './test/date-range-picker.test/date-range-picker.test.component';
 import { PopoverComponentTest } from './test/popover.test/popover.test.component';
import { SearchBoxTestComponent } from './test/search-box.test/search-box.test.component';
import { TestComponent } from './test/test.component';

import { SupplierRunningDateService } from './running-date/supplier.running-date.service';
import { UserRunningDateService } from './running-date/user.running-date.service';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule, 
    ],
    exports: [TestComponent],
    declarations: [
        TestComponent,
        ToggletPanelTestComponent,
        DateRangePickerTestComponent,
        SelectOptionsTestComponent,
        AutoCompleteTestComponent,
        SearchBoxTestComponent,
        PopoverComponentTest,
    ],
    providers: [
        SupplierRunningDateService,
        UserRunningDateService
    ],
})
export class TestModule { }