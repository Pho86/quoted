import { NextResponse } from 'next/server'
import { auth, db } from '../../../../firebase/firebase.config'
import { createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'
import { setDoc, doc, Timestamp, getDoc } from 'firebase/firestore'

export async function POST(req: any, res: any) {
  const data = await req.json()
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
      photoURL: userdata.avatar
    })
  }
  else {
    return NextResponse.json({ error: "Missing data" }, { status: 401 })
  }
  
  return NextResponse.json(userdata)
}
