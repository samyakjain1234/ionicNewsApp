import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
//import { firestore } from 'firebase-admin';
import { Observable } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';


export interface User {
  uid: string;
  email: string;
}

export interface userAttendanceData {
  date:Date;
  attendanceData: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public attendanceState: string;
  public absentReason: string;
  public itemString: string;
  public totalPresent: number;
  public totalAbsent: number;
  itemDoc: AngularFirestoreDocument

  currentUser: User = null;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public afs:AngularFirestore,
    public alertCtrl:AlertController, 
    public toastCtrl: ToastController
    )
    {
      this.afAuth.onAuthStateChanged((user)=>{
        console.log('changed', user);
        this.currentUser = user;
      })
      
    }

    async signup({ email, password }): Promise<any> {
      const credential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
   
      const uid = credential.user.uid;
   
      return this.afs.doc(
        `users/${uid}`
      ).set({
        uid,
        email: credential.user.email,
      })
    }
   
    signIn({ email, password }) {
      return this.afAuth.signInWithEmailAndPassword(email, password);
    }
   
    signOut(): Promise<void> {
      return this.afAuth.signOut();
    }
   

    getUsers(){
      return this.afs.collection('users').valueChanges({idField: 'uid'});
    }

    

   async deleteUser(item){
      console.log(item);
    console.log("clicked");
  //  await this.afAuth.de.then((e)=>{
  //     console.log('deleted from authentication');
     await this.afs.collection('users').doc(item.uid).delete().then(async()=>{  
        console.log('deleted form collection users' );
        let Ref = this.afs.collection('usersData').doc(item.uid).collection("userAttendance");
        await Ref.get().toPromise().then((querySnap)=>{
          querySnap.forEach((doc)=>{
            doc.ref.delete().then(async()=>{
              console.log('Deleted Successfully');
              const toast = this.toastCtrl.create({
                color: 'dark',
                duration: 20,
                message: 'Deleted Successfully',
              });
              (await toast).present();
            }).catch((e)=>{
              console.log('error deleting:',e);
            })
          })  
          console.log('deleted form collection usersData');
        }).catch((e)=>{
          console.log('error while deleting from userdata:',e)
        })
      }).catch((e)=>{
        console.log('error while deleting from users:',e)
      })
    
    }

 
}