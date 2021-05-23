import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Student } from 'src/app/models/student';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private db: AngularFirestore) { }

  async getStudent(): Promise<Student>{
    const query = await this.db.collection('students').ref.where('email', '==', environment.USER_EMAIL).get();
    const snapshot = query.docs[0];
    const data:any = snapshot.data();
    console.log(data);
    
    const student1: Student = {id:snapshot.id , firstName: data.firstName, lastName: data.lastName,
                                email: data.email, gpsLat:data.gpsLat, gpsLong:data.gpsLong, classes: data.classes };
    console.log('student1');
    console.log(student1);
    
    return student1;

  }
}
