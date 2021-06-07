import { Component, Inject, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-student-statistic-dialog',
  templateUrl: './student-statistic-dialog.component.html',
  styleUrls: ['./student-statistic-dialog.component.scss']
})
export class StudentStatisticDialogComponent implements OnInit {

  data: any;

  /* saleData = [
    { name: "fravære", value: 20 },
    { name: "tilstede", value: 40}
  ]; */

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
  }

  

}
