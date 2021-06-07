import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-teacher-statistic-dialog',
  templateUrl: './teacher-statistic-dialog.component.html',
  styleUrls: ['./teacher-statistic-dialog.component.scss']
})
export class TeacherStatisticDialogComponent implements OnInit {

  data:any;

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
  }

}
