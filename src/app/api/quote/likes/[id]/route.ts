import { db } from "../../../../../../firebase/firebase.config";
import { addDoc, collection, getDoc, doc, updateDoc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
   let { user, quoteid } = await req.json()
   const likeRef = await addDoc(collection(db, "likes"), {
      uid: user.uid,
      quoteid: quoteid,
      liked: true
   });
   const quote = doc(db, "quotes", quoteid)
   const quoteDoc = await getDoc(quote)
   // @ts-ignore
   let likes = quoteDoc.data().likes
   if (likes === undefined) {
      likes = 0
   }
   let amountOfLikes = likes + 1
   const quoteRef = await updateDoc(doc(db, "quotes", quoteid), {
      likes: amountOfLikes,
   })
   return NextResponse.json(user)
}

export async function PUT(req: any, res: any) {
   let { user, quoteid } = await req.json()
   if (user) {
      const q = query(collection(db, "likes"), where("uid", "==", user.uid), where("quoteid", "==", quoteid));
      const snaps = (await getDocs(q)).docs;
      await deleteDoc(doc(db, "likes", snaps[0].id));
      const quote = doc(db, "quotes", quoteid)
      const quoteDoc = await getDoc(quote)
      // @ts-ignore
      let likes = quoteDoc.data().likes
      if (likes === undefined) {
         likes = 0
      }
      let amountOfLikes = likes - 1
      const quoteRef = await updateDoc(doc(db, "quotes", quoteid), {
         likes: amountOfLikes,
      })
      return NextResponse.json(q)
   }
   
   else return NextResponse.json({ error: "You are not a user" }, { status: 401 })
}