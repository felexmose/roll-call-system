import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private db: AngularFirestore) { }

  async rollIn(className:string, date:string, studentEmail:string){
    const query = await this.db.collection('attendance').ref.where('className', '==',className ).where('date', '==',date).get();
    query.docs[0].ref.update({students: firebase.default.firestore.FieldValue.arrayUnion(studentEmail)});


    //query.ref update({students: firebase.firestore.FieldValue.arrayUnion("greater_virginia")});

    //let washingtonRef = this.db.collection('cities').doc('DC');
    
  }
}
