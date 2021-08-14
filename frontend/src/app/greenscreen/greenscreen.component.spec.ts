import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenscreenComponent } from './greenscreen.component';

describe('GreenscreenComponent', () => {
  let component: GreenscreenComponent;
  let fixture: ComponentFixture<GreenscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
