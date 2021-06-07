import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Teacher } from 'src/app/models/teacher';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private db: AngularFirestore) { }
  
  async getTeacher(){
    const query = await this.db.collection('teachers').ref.where('email', '==', environment.USER_EMAIL).get();
    const snapshot = query.docs[0];
    const data:any = snapshot.data();
    console.log(data);
    
    const teacher1: Teacher = {id:snapshot.id , firstName: data.firstName, lastName: data.lastName,
                                email: data.email, gpsLat:data.gpsLat, gpsLong:data.gpsLong, classes: data.classes };
    console.log('teacher1');
    console.log(teacher1);
    
    return teacher1;
  }

}
