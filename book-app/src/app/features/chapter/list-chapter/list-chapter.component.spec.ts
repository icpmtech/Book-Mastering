import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookComponent } from './list-chapter.component';

describe('ListChapterComponent', () => {
  let component: ListChapterComponent;
  let fixture: ComponentFixture<ListBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListChapterComponent]
    });
    fixture = TestBed.createComponent(ListChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
