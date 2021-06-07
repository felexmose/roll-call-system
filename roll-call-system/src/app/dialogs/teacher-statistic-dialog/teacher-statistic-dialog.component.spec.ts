import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStatisticDialogComponent } from './teacher-statistic-dialog.component';

describe('TeacherStatisticDialogComponent', () => {
  let component: TeacherStatisticDialogComponent;
  let fixture: ComponentFixture<TeacherStatisticDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherStatisticDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherStatisticDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
