import { NextResponse } from 'next/server'
import { auth, db } from '../../../../firebase/firebase.config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc, Timestamp } from 'firebase/firestore'

export async function POST(req: any) {
  const res = req
  const data = await res.json()
  const userdata = data.signup
  if (userdata.email && userdata.password) {
    const userCred = await createUserWithEmailAndPassword(auth, userdata.email, userdata.password);
    const usersRef = await setDoc(doc(db, "users", userCred.user.uid), {
      username: userdata.username,
      email: userdata.email,
      location: userdata.location,
      avatar: userdata.avatar,
      bio: userdata.bio,
      created_on: Timestamp.fromDate(new Date())
    });
    const userUpdate = await updateProfile(userCred.user, {
      displayName: userdata.username,
      photoUrl: userdata.avatar
    })

  }

  return NextResponse.json(userdata)
}