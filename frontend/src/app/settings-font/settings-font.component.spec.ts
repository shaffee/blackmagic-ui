import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFontComponent } from './settings-font.component';

describe('SettingsFontComponent', () => {
  let component: SettingsFontComponent;
  let fixture: ComponentFixture<SettingsFontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsFontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsFontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
