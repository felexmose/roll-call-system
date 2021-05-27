import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/teacher';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { ClassService } from 'src/app/services/class/class.service';
import { LocationService } from 'src/app/services/location/location.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-teacher-classes',
  templateUrl: './teacher-classes.component.html',
  styleUrls: ['./teacher-classes.component.scss']
})
export class TeacherClassesComponent implements OnInit {

  //determines wether start roll call btn should be disabled.
  rollCallActive: boolean = false;

  currentTeacher: Teacher = {id:'', firstName:'', lastName:'', gpsLat:0, gpsLong:0, email:'',classes:null}

  constructor(private teacherSvc: TeacherService, private locationSvc: LocationService, private classesSvc: ClassService, private attendanceSvc: AttendanceService) { }

  async ngOnInit(): Promise<void> {
    await this.setTeacher();
    console.log('current teacher:');
    console.log(this.currentTeacher);

    // get teachers gps location
    await this.locationSvc.getPosition().then(pos=>
      {
         console.log(`Positon: ${pos.lng} ${pos.lat}`);
         this.currentTeacher.gpsLong = pos.lng;
         this.currentTeacher.gpsLat = pos.lat;
      });
    //console.log('setting class coords');
    //this.setClassGpsCoords('SI');
    //this.attendanceSvc.postAnttendance('SI');

  }

  async setTeacher(){
    this.currentTeacher = await this.teacherSvc.getTeacher();

  }

  async startRollCall(className: string){
    // set teacher gps location as the class gps location.
    await this.classesSvc.setClassGps(className, this.currentTeacher.gpsLat, this.currentTeacher.gpsLong);
    // confirm that atteandance on the current date doesnt already exist.
    const length = await this.attendanceSvc.checkWhetherAttendanceExists(className, new Date().toISOString().split('T')[0]);
    console.log('lenght of attendance on date:');
    console.log(length);
    //create the actual class row in the attendance database table
    if(length == 0){
      this.attendanceSvc.postAnttendance(className);
    }
    
  }

  seeStatistics(className: string){
    console.log('show statistics for:' + className);

  }


}
