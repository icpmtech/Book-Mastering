import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookComponent } from './create-section.component';

describe('CreateBookComponent', () => {
  let component: CreateBookComponent;
  let fixture: ComponentFixture<CreateBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBookComponent]
    });
    fixture = TestBed.createComponent(CreateBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
