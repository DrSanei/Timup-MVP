// src/api/startupAPI.js
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export const getAllStartups = async () => {
  const snapshot = await getDocs(collection(db, "startups"))
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}
