import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from './../_shared/shared.module';


import { SupplierListComponent } from './supplier-list/supplier-list.component';

import { SupplierService } from './supplier.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
       
        SharedModule, 
    ],
    exports: [ 
        SupplierListComponent
        ],
    declarations: [
        SupplierListComponent,
    ],
    providers: [SupplierService],
})
export class SupplierModule { }
