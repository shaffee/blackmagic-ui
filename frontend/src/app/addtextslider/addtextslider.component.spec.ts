import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtextsliderComponent } from './addtextslider.component';

describe('AddtextsliderComponent', () => {
  let component: AddtextsliderComponent;
  let fixture: ComponentFixture<AddtextsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtextsliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtextsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
