import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore, private router: Router) { }

  addUser(data) {
    return new Promise<any>((resolve, reject) =>{
        this.db
            .collection("users")
            .add(data)
            .then(res => {

            }, err => reject(err));
    });
  }

  async loginUser(email: String, password:String){

    const query = await this.db.collection('users').ref.where('email', '==', email).get();
    if (!query.empty) {
      const snapshot = query.docs[0];
      const data:any = snapshot.data();
      console.log(data);
      const user1: User = {id: snapshot.id ,email: data.email, password: data.password,role: data.role };
      console.log('user1:');
      console.log(user1);

      environment.USER_ID = snapshot.id;
      environment.USER_EMAIL = data.email;
      environment.USER_ROLE = data.role;

      if(data.password == password && data.role == 'students'){
        console.log('password matches student');
        this.router.navigate(['student']);
      }

      if(data.password == password && data.role == 'teachers'){
        console.log('password matches teacher');
        this.router.navigate(['teacher']);
      }
      console.log('password doesnt match');
      
    } else {
      // not found
      console.log('no such user');
    }
  /*   this.db.collection("users").ref.where("email", "==", email)
      .get()
      .then(snapshot => {
        snapshot.forEach((doc)=> {
          console.log(doc.data());
          const dbUser:any = doc.data();
          const user1: User = {id: doc.id ,email: dbUser.email, password: dbUser.password,role: dbUser.role };
          console.log('user1:');
          console.log(user1);
        })        
      }, err => console.log(err)); {

      } */
  }

}
