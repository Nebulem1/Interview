import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
const FirebaseAdmin=()=>{
     const app=getApps()
    if(!app.length){
        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_ID,
                privateKey: process.env.FIREBASE_KEY?.replace(/\\n/g, '\n'),
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            }),
        });
    }
    return {
        auth:getAuth(),
        db:getFirestore()
    }
}

export const {auth,db}=FirebaseAdmin();