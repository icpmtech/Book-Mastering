import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookComponent } from './edit-section.component';

describe('EditBookComponent', () => {
  let component: EditBookComponent;
  let fixture: ComponentFixture<EditBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBookComponent]
    });
    fixture = TestBed.createComponent(EditBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});