import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAnimationsComponent } from './settings-animations.component';

describe('SettingsAnimationsComponent', () => {
  let component: SettingsAnimationsComponent;
  let fixture: ComponentFixture<SettingsAnimationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsAnimationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
