import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ItemPanelComponent,ListViewComponent, GridViewComponent} from './components/item-panel/item-panel.component';
import { ToggletPanelComponent } from './components/togglet-panel/togglet-panel.component';
import { AutoCompleteComponent } from './components/options-components/auto-complete/auto-complete.component';
import { SelectOptionComponent } from './components/options-components/select-option/select-option.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';

import { AutoSizeDirective } from './directives/auto-size.directive';
import { ParentSizeDirective } from './directives/parent-size.directive';
import { HidenItensDirective } from './directives/hiden-itens.directive';

import { GroupByPipe } from './pipes/group-by.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
    imports: [
         CommonModule,
         FormsModule,
         InfiniteScrollModule,
    ],
    exports: [
        ItemPanelComponent,
        ListViewComponent,
        GridViewComponent,
        ToggletPanelComponent,
        AutoCompleteComponent,
        SelectOptionComponent,
        DateRangePickerComponent,

        GroupByPipe
    ],
    declarations: [
        ItemPanelComponent,
        ListViewComponent,
        GridViewComponent,
        ToggletPanelComponent,
        AutoCompleteComponent,
        SelectOptionComponent,
        DateRangePickerComponent,

        GroupByPipe,
        DateFormatPipe,

        AutoSizeDirective,
        ParentSizeDirective,
        HidenItensDirective,
    ],
    providers: [],
})
export class SharedModule { }
