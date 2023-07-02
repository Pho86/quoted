import { query, collection, where, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../../firebase/firebase.config";
import { NextResponse } from "next/server";
import { auth } from "../../../../../../firebase/firebase.config";

export async function GET(req: any, res: any) {
   let quotes = [] as any;
   if (res.params.id) {
      const q = query(collection(db, "quotes"), orderBy("created_on", "desc"), where("uid", "==", res.params.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc: any) => {
         quotes.push({ ...doc.data(), id: doc.id })
      });
      return NextResponse.json(quotes)
   } else {
      return NextResponse.json({ error: "Wrong user id" }, { status: 401 })
   }
}
