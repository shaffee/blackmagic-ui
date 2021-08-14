import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextslidersComponent } from './textsliders.component';

describe('TextslidersComponent', () => {
  let component: TextslidersComponent;
  let fixture: ComponentFixture<TextslidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextslidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextslidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
