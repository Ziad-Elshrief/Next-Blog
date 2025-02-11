import { auth, db } from "@/utils/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useUserInfo() {
  const [user, setUser] = useState<DocumentData | undefined | null>();
  const [authInfo, setAuthInfo] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setIsLoading(true);
      if (authUser) {
        setAuthInfo(authUser);
        getDoc(doc(db, "users", authUser.uid))
          .then((userSnap) => setUser(userSnap.data()))
          .catch(() => setUser(null))
          .finally(() => setIsLoading(false));
      } else {
        setUser(null);
        setAuthInfo(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { isLoading, user, authInfo };
}
