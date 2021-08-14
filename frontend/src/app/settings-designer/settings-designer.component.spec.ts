import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDesignerComponent } from './settings-designer.component';

describe('SettingsDesignerComponent', () => {
  let component: SettingsDesignerComponent;
  let fixture: ComponentFixture<SettingsDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsDesignerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
