import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStatisticDialogComponent } from './student-statistic-dialog.component';

describe('StudentStatisticDialogComponent', () => {
  let component: StudentStatisticDialogComponent;
  let fixture: ComponentFixture<StudentStatisticDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentStatisticDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentStatisticDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
