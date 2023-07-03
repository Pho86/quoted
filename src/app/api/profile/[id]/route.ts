import { NextResponse } from "next/server";
import { getDoc } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase.config";

export async function GET(req: any, res: any) {
   let userdata;
   if (res.params.id) {
      const docRef = doc(db, "users", res.params.id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return NextResponse.json({ error: "Wrong user id" }, { status: 401 })
      userdata = { ...docSnap.data() }
      return NextResponse.json(userdata)
   }
   else {
      return NextResponse.json({ error: "Wrong user id" }, { status: 401 })
   }
}

export async function PUT(req: any, res: any) {
   let { profile, auth } = await req.json()
   if (res.params.id) {
      const docRef = doc(db, "users", res.params.id);
      await updateDoc(docRef, {
         username: profile.username,
         location: profile.location,
         avatar: profile.avatar,
         bio: profile.bio,
         hideProfile: profile.hideProfile,
      });
      return NextResponse.json(profile)
   }
   else {
      return NextResponse.json({ error: "Wrong user id" }, { status: 401 })
   }
}

