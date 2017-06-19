/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ToggletPanelTestComponent } from './togglet-panel.test.component';

describe('ToggletPanelTestComponent', () => {
  let component: ToggletPanelTestComponent;
  let fixture: ComponentFixture<ToggletPanelTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggletPanelTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggletPanelTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
