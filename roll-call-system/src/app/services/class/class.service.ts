import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
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


}
