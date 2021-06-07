import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Class } from 'src/app/models/class';
import { LocationService } from '../location/location.service';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private db: AngularFirestore, private locationSvc: LocationService) { }

  async setClassGps(className: string,lat: number, long: number){
    const query = await this.db.collection('classes').ref.where('name', '==',className ).get();
    query.docs[0].ref.update({gpsLat: lat , 
                              gpsLong: long,
                              rollCall:true,
                            startTime: Date.now()});

  }

  async getSpecificClass(className:string){
    const query = await this.db.collection('classes').ref.where('name', '==', className).get();
    const snapshot = query.docs[0];

    const data:any = snapshot.data();
    console.log(data);
    
    const class1: Class = {id:snapshot.id , name: data.name, rollCall: data.rollCall,
                                startTime: data.startTime, systemCode: data.systemCode,
                                gpsLat:data.gpsLat, gpsLong:data.gpsLong, classesHeld: data.classesHeld,
                                numberOfStudents: data.numberOfStudents };
    console.log('class1');
    console.log(class1);
    
    return class1;

  }


}
