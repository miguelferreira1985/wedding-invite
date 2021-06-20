import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';

import { User } from './user';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    userData: any;

    constructor( private afs: AngularFirestore ,
                private afAuth: AngularFireAuth,
                private router: Router,
                private ngZone: NgZone
    ) {

        this.afAuth.authState.subscribe( user => {
            if ( user ) {
                this.userData = user;
                localStorage.setItem( 'user', JSON.stringify( this.userData ));
                JSON.parse( localStorage.getItem( 'user' ));
            }else {
                localStorage.setItem( 'user', null);
                JSON.parse( localStorage.getItem( 'user' ));
            }
        });
    }

    SignIn( email, password ) {
        return this.afAuth.signInWithEmailAndPassword( email, password)
            .then( ( result ) => {
                this.ngZone.run( () => {
                    this.router.navigate(['guest-management']);
                });
                this.SetUserData( result.user );
            }).catch((error) => {
                window.alert( error.message );
            });
    }

    ForgotPassword( passwordResetEmail ) {
        return this.afAuth.sendPasswordResetEmail( passwordResetEmail )
            .then(() => {
                window.alert( 'Password reset email sent, chek your inbox.' );
            }).catch((error) => {
                console.log(error);
                window.alert(error);
            });
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse( localStorage.getItem( 'user' ));
        return ( user !== null ) ? true : false;
    }

    SetUserData( user ) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
        };
    }

    SingOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['login']);
        })
    }

}
