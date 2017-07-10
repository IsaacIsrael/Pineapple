/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PopoverComponentTest } from './popover.test.component';

describe('PopoverComponent', () => {
  let component: PopoverComponentTest;
  let fixture: ComponentFixture<PopoverComponentTest>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverComponentTest ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverComponentTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
