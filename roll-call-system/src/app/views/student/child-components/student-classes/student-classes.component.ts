import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-student-classes',
  templateUrl: './student-classes.component.html',
  styleUrls: ['./student-classes.component.scss']
})
export class StudentClassesComponent implements OnInit {

  currentStudent:Student = {id:'', firstName:'', lastName:'', gpsLat:0,gpsLong:0,email:'',classes:null}



  constructor(private studentSvc: StudentService, private attendaceSvc: AttendanceService) { }

  async ngOnInit(): Promise<void> {
    await this.setStudent();
    console.log('current student:');
    console.log(this.currentStudent);
    console.log('rolling in student:xxx');
    await this.attendaceSvc.rollIn('DB','11111112','xxx@yahoo.dk' );

  }

  async setStudent(){
    this.currentStudent = await this.studentSvc.getStudent();

  }

  rollIn(class1: String){


  }


  

}