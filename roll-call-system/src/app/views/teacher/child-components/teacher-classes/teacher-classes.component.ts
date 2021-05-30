import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { StudentStatisticDialogComponent } from 'src/app/dialogs/student-statistic-dialog/student-statistic-dialog.component';
import { TeacherStatisticDialogComponent } from 'src/app/dialogs/teacher-statistic-dialog/teacher-statistic-dialog.component';
import { Class } from 'src/app/models/class';
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

  currentClass: Class = {id:'', name:'', rollCall: null, startTime: null, systemCode:'', gpsLat:null, 
                          gpsLong:null, classesHeld:null,numberOfStudents:null}

  saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];

  modalRef: MDBModalRef;

  constructor(private modalService: MDBModalService, private teacherSvc: TeacherService, private locationSvc: LocationService, private classesSvc: ClassService, private attendanceSvc: AttendanceService) { }

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

  async seeStatistics(className: string){
    console.log('show statistics for:' + className);
    //this.currentClass = await this.classesSvc.getSpecificClass(className);
    const numberOfStudentsAttendanceData = await this.attendanceSvc.getNumberOfStudentAttendanceForSpecificClass(className);
    console.log('student attendance data:');
    console.log(numberOfStudentsAttendanceData);

    this.openStatisticModal(numberOfStudentsAttendanceData);

  }

      /**
   * Opens the modal that shows the statistics
   * @param attendanceData
   */
       openStatisticModal(attendanceData:any[]) {
        //const attendanceData: any = [{name:'absent', value:averageStudentAttendance }, {name:'classes', value:this.currentClass.numberOfStudents}]
 
       const modalOptions = {
         backdrop: true,
         keyboard: true,
         focus: true,
         show: false,
         ignoreBackdropClick: false,
         class: 'modal-lg modal-dialog-centered',
         containerClass: '',
         animated: true,
         data: {
           data: attendanceData,
         }
       };
   
       this.modalRef = this.modalService.show(TeacherStatisticDialogComponent, modalOptions);
     }



}
