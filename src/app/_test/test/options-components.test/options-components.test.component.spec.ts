/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OptionsComponentsTestComponent } from './options-components.test.component';

describe('OptionsComponentsTesteComponent', () => {
  let component: OptionsComponentsTestComponent;
  let fixture: ComponentFixture<OptionsComponentsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsComponentsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsComponentsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
