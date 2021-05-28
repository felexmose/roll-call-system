import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { LocationService } from '../location/location.service';



@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private db: AngularFirestore, private locationSvc: LocationService) { }

  async rollInTest(className:string, date:string, studentEmail:string){
    const query = await this.db.collection('attendance').ref.where('className', '==',className ).where('date', '==',date).get();
    query.docs[0].ref.update({students: firebase.default.firestore.FieldValue.arrayUnion(studentEmail)});

    //query.ref update({students: firebase.firestore.FieldValue.arrayUnion("greater_virginia")});

    //let washingtonRef = this.db.collection('cities').doc('DC');
    
  }

  postAnttendance(className: string){
    const query = this.db.collection('attendance').doc();
    query.set({name: className,
                date: new Date().toISOString().split('T')[0], students:[]});
  }

  async checkWhetherAttendanceExists(className:string, date: string): Promise<number>{
    const query = await this.db.collection('attendance').ref.where('name', '==', className).where('date', '==', date).get();
    return  query.docs.length;

  }

  async rollIn(className:string, studentLat:number, studentLong: number){
    const query = await this.db.collection('classes').ref.where('name', '==',className ).get();
    const snapshot = query.docs[0];
    const data:any = snapshot.data();
    const startTime:number = data.startTime;
    console.log('start time:');
    console.log(startTime);
    const rollInDeadline = Date.now() - startTime;
    console.log('deadline time:');
    console.log(rollInDeadline);

    // calculate distance between student and teacher via gps coords.
    const distanceBetween: number =  this.locationSvc.distanceInKmBetweenEarthCoordinates(studentLat, studentLong, data.gpsLat, data.gpsLong);
    console.log('distance between gps coords:')
    console.log(distanceBetween);

    // roll student in if rollInDeadlineTime is less than 10mins(10*60000)
    if(rollInDeadline <= 600000  && distanceBetween <= 0.1 ){
      
      // roll student in, no need to check wether attendance on current date exits, due to the fact that it automatically set by the teacher.
      console.log('rolling in');
      const query = await this.db.collection('attendance').ref.where('name', '==',className ).where('date', '==',new Date().toISOString().split('T')[0]).get();
      query.docs[0].ref.update({students: firebase.default.firestore.FieldValue.arrayUnion(environment.USER_EMAIL)});

    } else {
            // too late to roll in
            console.log('too late to roll in');     
    }
  }

  async getAttendanceForSpecificStudent(className: string, studentsEmail: string) {
    const query = await this.db.collection('attendance').ref.where('name','==',className).where('students','array-contains',studentsEmail).get();
    return query.docs;

  }
}
