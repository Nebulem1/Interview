'use server';

import { auth, db } from "@/Firebase/admin";
import { cookies } from "next/headers";
import { success } from "zod";
import { ca } from "zod/v4/locales";

export async function signUp(params:SignUpParams) {
    const {uid,name,email}=params;
    try{
           const userRecord=await db.collection('users').doc(uid).get(); //Iska matlab kya hai?
                                                                        // 👉 Firestore ke users collection me jao
                                                                        // 👉 uid naam ka document dhundo
                                                                        // 👉 Uska data nikaalo

           if(userRecord.exists){                                      // userRecord.exists   // true / false
                                                                       // userRecord.data()   // actual data (object)
                return{
                    success:false,
                    message:"User already exists"
                }
           }

           await db.collection('users').doc(uid).set({      //Ye kya karta hai?
                                                            // 👉 Agar document exist nahi karta → create karega
                                                            // 👉 Agar already exist karta hai → overwrite karega
                name,
                email
           });
            return{
                success:true,
                message:"Account created successfully. Please sign in"
            }
    }catch(e:any){
        console.log("Error creating user:", e);
        if(e.code==="auth/email-already-exists"){
            return{
                success:false,
                message:"Email already in use"
            }
        }
        return{
            success:false,
            message:"Failed to create an account"
        }
    }
}

export async function setSessionCookie(idToken:string) {
      const cookieStore = await cookies()
      const sessionCookie= await auth.createSessionCookie(idToken,{expiresIn: 5*24*60*60*1000});
      cookieStore.set('session',sessionCookie,{
        maxAge: 5*24*60*60,
        httpOnly:true,
        path:'/',
        sameSite:'lax',
        secure: process.env.NODE_ENV === "production"
      })
}

export async function signIn(params:SignInParams) {
    const {email,idToken}=params;
    try{
         
        const userRecord= await auth.getUserByEmail(email);       // only checking whether user exist or not

        if(!userRecord){
            return{
                success:false,
                message:"User does not exist"
            }
        }
        await setSessionCookie(idToken);
    }catch(e){
        return{
            success:false,
            message:"Failed to sign in"
        }
    }
}

export async function getCurrentUser():Promise<User | null> {
    const cookieStore=await cookies();
    const sessionCookie=cookieStore.get('session')?.value;
    if(!sessionCookie){
        return null;
    }

    try{
        const decodedClaims= await auth.verifySessionCookie(sessionCookie,true);
        const userRecord= await db.collection('users').doc(decodedClaims.uid).get();
        if(!userRecord.exists){
            return null;
        }
        return {
            ...userRecord.data(),
            id: userRecord.id
        } as User;
    }catch(e){
        console.log("Error verifying session cookie:", e);
        return null;
    }
}

export async function isAuthenticated() {
    const user= await getCurrentUser();
    return !!user
}