import { db } from "../../../../firebase/firebase.config";
import { query, collection, getDocs, orderBy } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
   let users = [] as any;
   const q = query(collection(db, "users"), orderBy("created_on", "desc"));
   const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc: any) => {
      users.push({ ...doc.data(), id: doc.id })
   });
   return NextResponse.json(users)
}