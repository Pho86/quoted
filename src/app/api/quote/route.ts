import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { db,  } from '../../../../firebase/firebase.config'
import { addDoc, collection, Timestamp, doc, query, orderBy, getDocs, deleteDoc, serverTimestamp} from 'firebase/firestore'

export async function GET(req: any, res: any) {
   let quotes = [] as any;
   const q = query(collection(db, "quotes"), orderBy("created_on", "desc"));
   const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc: any) => {
      quotes.push({ ...doc.data(), id: doc.id })
   });
   return NextResponse.json(quotes)
}

export async function POST(req: any) {
   const res = req
   const data = await res.json()
   const quoteData = data.quote
   const userData = data.userData
   if (userData.photoURL === null || userData.photoURL === undefined || userData.photoURL === "") {
      userData.photoURL = "https://firebasestorage.googleapis.com/v0/b/quoted-5a75d.appspot.com/o/profileImages%2FQUOTEDLOGO.png?alt=media&token=77ddde79-fa22-4726-8c26-928f1cbea25a"
   }
   if (quoteData.quote === null || quoteData.quote === undefined || quoteData.quote === "") {
      return NextResponse.json({ error: "quote is required." }, { status: 400})
   }
   const quoteRef = await addDoc(collection(db, "quotes"), {
      uid: userData.uid,
      quote: quoteData.quote,
      authour: quoteData.authour,
      created_on: serverTimestamp(),
      avatar: userData.photoURL,
      username: userData.displayName,
   });
   return NextResponse.json(quoteData)
}

export async function DELETE(req: any, res:any) { 
   const data = await req.json()
   const quoteData = data.quote
   const userData = data.userData

   if (userData.uid === quoteData.uid) {
      await deleteDoc(doc(db, "quotes", quoteData.uid));
   }
   else {
      return NextResponse.json({ error: "You don't own this quote" }, { status: 401 })
   }

   return NextResponse.json(quoteData)
}
