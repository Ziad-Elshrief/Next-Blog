import { auth, db } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useUserInfo() {
  const [user, setUser] = useState<DocumentData | null>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getUserInfo = async (uid: string) => {
      const userDB = await getDoc(doc(db, "users", uid));
      setUser(userDB.data());
    };
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setIsLoading(true);
      if (authUser) {
        getUserInfo(authUser.uid);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return { isLoading, user };
}
