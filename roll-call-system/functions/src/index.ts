import * as functions from "firebase-functions";
//import * as bodyParser from "body-parser";

//const express = require("express");
//const cors = require("cors");

const admin = require("firebase-admin");

//initialize firebase inorder to access its services
admin.initializeApp();
const db = admin.firestore();


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

// firebase function for gettting a specific student by email.
export const getStudentByEmail = functions.https.onRequest(async (req, res)=>{
  
  try{
    const requestBody = req.body;
    const studentEmail = requestBody.email;

    const query = await db.collection('students').ref.where('email', '==', studentEmail).get();
    const snapshot = query.docs[0];
    const data:any = snapshot.data();
  
    res.status(200).send(JSON.stringify({id:snapshot.id, ...data}));

  } catch(error){
      res.status(500).send(error);
  }
   
})

// firebase function for gettting a class specific by name.
export const getClassByName = functions.https.onRequest(async (req, res)=>{
  
  try{
    const requestBody = req.body;
    const className = requestBody.name;

    const query = await db.collection('classes').ref.where('name', '==', className).get();
    const snapshot = query.docs[0];
    const data:any = snapshot.data();
  
    res.status(200).send(JSON.stringify({id:snapshot.id, ...data}));

  } catch(error){
      res.status(500).send(error);
  }
   
})

//firebase function for getting attendance for a given student at given class.
export const getAttendanceForGivenStudent = functions.https.onRequest(async (req, res) => {
  try{
    const requestBody = req.body;
    const className = requestBody.className;
    const studentEmail = requestBody.studentEmail;

    const query = await db.collection('attendance').ref.where('name','==',className).where('students','array-contains',studentEmail).get();
    
    const snapshot = query.docs;
    const data = snapshot.dat();

    res.status(200).send(JSON.stringify(data));  

  } catch (error){
    res.status(500).send(error);
  }
}) 




export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

 

