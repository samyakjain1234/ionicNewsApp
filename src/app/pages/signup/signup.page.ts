import {AuthService} from 'src/app/services/auth.service';
import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

import 'firebase/firestore'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  
  credentialForm: FormGroup;

  // public user:string;
  // public isUser:Boolean=false;
  // public db:any;
  
  constructor(
    private authService:AuthService,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    private router: Router,
    public afAuth: AngularFireAuth,
    public afs:AngularFirestore
  )
    
    {


    // console.log(this.afs.collection('users').doc().get());
    
    // this.afAuth.authState.subscribe((usr)=>{

    //   if(usr){
    //     this.isUser = true;
    //     this.user = usr.displayName;
    //     console.log(usr.displayName);
    //   }
    //   else{
    //     console.log("no user found");
    //   }
    // })
    
  }

  ngOnInit() {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  
 
 

  async signUp() {
    const loading = await this.loadCtrl.create();
    await loading.present();
    this.authService
      .signup(this.credentialForm.value)
      .then(
        async (user) => {
          loading.dismiss();
          // console.log(user.email);
          // this.router.navigateByUrl('/admin-details', { replaceUrl: true });
          const alert =  this.alertCtrl.create({
            header: 'Signed Up Successfully',
            buttons: ['OK'],
          });
          (await alert).present();
        },
        async (err) => {
          loading.dismiss();
          const alert = await this.alertCtrl.create({
            header: 'Sign up failed',
            message: err.message,
            buttons: ['OK'],
          });
 
          await alert.present();
        }
      );
  }


 
  // Easy access for form fields
  get email() {
    return this.credentialForm.get('email');
  }
  
  get password() {
    return this.credentialForm.get('password');
  }
}
  

  

  // workerDatabase(){
  //   console.log("dcds");
    
  //   this.router.navigate(['worker-database']);
  // }

  // submit(){
  //   console.log("submit clicked");
  //   this.afAuth.authState.subscribe((usr)=>{
  //         let json = {
  //           email: usr.email,
  //           name: usr.displayName
  //         }

  //         this.afs.collection('users').add(json).then((doc)=>{
  //           console.log("document wriiten with id:",doc.id);
  //           }).catch((e)=>{
  //           console.log('error while adding:',e);
  //           })   
  //       })  
  //   } 
  // }

  // // onAdminClick(){
  // //  this.router.navigate(['login']);
  // // }

  // // onPersonClick(){
  // //   this.router.navigate(['login-worker']);  
  // // }
