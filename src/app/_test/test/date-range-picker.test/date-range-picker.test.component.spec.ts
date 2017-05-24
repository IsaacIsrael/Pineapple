/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DateRangePickerTestComponent } from './date-range-picker.test.component';

describe('DateRangePickerComponent', () => {
  let component: DateRangePickerTestComponent;
  let fixture: ComponentFixture<DateRangePickerTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateRangePickerTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangePickerTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
