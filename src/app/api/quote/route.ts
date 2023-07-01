import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { auth, db, storage } from '../../../../firebase/firebase.config'
import { addDoc, collection, Timestamp, updateDoc, doc, query, orderBy, getDocs, deleteDoc} from 'firebase/firestore'

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
      userData.photoURL = "https://firebasestorage.googleapis.com/v0/b/quoted-5a75d.appspot.com/o/profileImages%2F__hoshino_ai_oshi_no_ko_and_2_more_drawn_by_dosei__sample-c52b4599c7f74833de8ba05ddb4a4d90.jpg?alt=media&token=1d3925aa-c16f-4b72-92d7-3277847426e1"
   }
   if (quoteData.quote === null || quoteData.quote === undefined || quoteData.quote === "") {
      return NextResponse.json({ error: "quote is required." }, { status: 400})
   }

   const quoteRef = await addDoc(collection(db, "quotes"), {
      uid: userData.uid,
      quote: quoteData.quote,
      authour: quoteData.authour,
      created_on: Timestamp.fromDate(new Date()),
      avatar: userData.photoURL,
      username: userData.displayName,
   });


   return NextResponse.json(quoteData)
}

export async function PUT(req: any) {
   const res = req
   const data = await res.json()
   const quoteData = data.quote
   const userData = data.userData
   if (userData.photoURL === null || userData.photoURL === undefined || userData.photoURL === "") {
      userData.photoURL = "https://firebasestorage.googleapis.com/v0/b/quoted-5a75d.appspot.com/o/profileImages%2F__hoshino_ai_oshi_no_ko_and_2_more_drawn_by_dosei__sample-c52b4599c7f74833de8ba05ddb4a4d90.jpg?alt=media&token=1d3925aa-c16f-4b72-92d7-3277847426e1"
   }

   const docRef = doc(db, 'quotes', data.quote.id);

   const updateQuote = await updateDoc(docRef, {
      quote: quoteData.quote,
      authour: quoteData.authour,
      updated_on: Timestamp.fromDate(new Date()),
      avatar: userData.photoURL,
      name: userData.displayName,
   });

   return NextResponse.json(quoteData)
}


export async function DELETE(req: any) { 
   const res = req
   const data = await res.json()
   const quoteData = data.quote
   const userData = data.userData

   if (userData.uid === quoteData.uid) {
      await deleteDoc(doc(db, "quotes", quoteData.uid));
   }

   return NextResponse.json(quoteData)
}
