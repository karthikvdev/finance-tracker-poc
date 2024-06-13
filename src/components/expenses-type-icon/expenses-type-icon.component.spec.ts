import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesTypeIconComponent } from './expenses-type-icon.component';

describe('ExpensesTypeIconComponent', () => {
  let component: ExpensesTypeIconComponent;
  let fixture: ComponentFixture<ExpensesTypeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesTypeIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpensesTypeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
