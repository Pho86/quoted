import { query, collection, where,  getDocs } from "firebase/firestore";
import { db } from "../../../../../../firebase/firebase.config";
import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
   let likes = [] as any;
   if (res.params.id) {
      const q = query(collection(db, "likes"), where("uid", "==", res.params.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc: any) => {
         likes.push({ ...doc.data(), id: doc.id })
      });
      return NextResponse.json(likes)
   } else {
      return NextResponse.json({ error: "Wrong user id" }, { status: 401 })
   }
}
