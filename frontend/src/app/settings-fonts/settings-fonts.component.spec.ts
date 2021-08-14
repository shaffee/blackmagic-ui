import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFontsComponent } from './settings-fonts.component';

describe('SettingsFontsComponent', () => {
  let component: SettingsFontsComponent;
  let fixture: ComponentFixture<SettingsFontsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsFontsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsFontsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
