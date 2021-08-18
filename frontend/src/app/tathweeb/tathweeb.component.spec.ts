import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TathweebComponent } from './tathweeb.component';

describe('TathweebComponent', () => {
  let component: TathweebComponent;
  let fixture: ComponentFixture<TathweebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TathweebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TathweebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
