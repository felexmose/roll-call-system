import { Component, OnInit } from '@angular/core';
import { Attendance } from 'src/app/models/attendance';

import { Student } from 'src/app/models/student';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { ClassService } from 'src/app/services/class/class.service';
import { LocationService } from 'src/app/services/location/location.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-student-classes',
  templateUrl: './student-classes.component.html',
  styleUrls: ['./student-classes.component.scss']
})
export class StudentClassesComponent implements OnInit {

  currentStudent:Student = {id:'', firstName:'', lastName:'', gpsLat:0,gpsLong:0,email:'',classes:null}

  attendance: string[];

  showAttendance: boolean = false;

  //modalRef: MDBModalRef;
  studentAttendance:Attendance[] = [];

  saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];



  constructor(private studentSvc: StudentService, private attendanceSvc: AttendanceService, private classSvc: ClassService, private locationSvc: LocationService, /* private modalService: MDBModalService */) { }

  async ngOnInit(): Promise<void> {
    await this.setStudent();
    console.log('current student:');
    console.log(this.currentStudent);
    //console.log('rolling in student:xxx');
    //this.attendaceSvc.rollIn('DB','11111112','xxx@yahoo.dk' );

    // get and set students gps location.
    await this.locationSvc.getPosition().then(pos=>
      {
         console.log(`student Positon: ${pos.lng} ${pos.lat}`);
         this.currentStudent.gpsLong = pos.lng;
         this.currentStudent.gpsLat = pos.lat;
      });
    //console.log('setting class coords');
    //this.setClassGpsCoords('SI');
    //this.attendanceSvc.postAnttendance('SI');
  }

  async setStudent(){
    this.currentStudent = await this.studentSvc.getStudent();

  }

  
  rollIn(className: string){
    this.attendanceSvc.rollIn(className,this.currentStudent.gpsLat, this.currentStudent.gpsLong );
  }

  async seeAttendance(className: string){
    console.log('show attendance for:' + className);
    this.studentAttendance = await this.attendanceSvc.getAttendanceForSpecificStudent(className, this.currentStudent.email);
    this.showAttendance = !this.showAttendance;
    
  }


  

}