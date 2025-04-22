import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowEditComponent } from './borrow-edit.component';

describe('BorrowEditComponent', () => {
  let component: BorrowEditComponent;
  let fixture: ComponentFixture<BorrowEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowEditComponent]
    });
    fixture = TestBed.createComponent(BorrowEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
