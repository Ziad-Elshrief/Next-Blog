import { auth, db, provider } from "@/utils/firebase";
import {
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().max(60, "First Name must not exceed 60 charachters"),
  lastName: z.string().max(60, "Last Name must not exceed 60 charachters"),
  email: z.string().email("Invalid Email").trim(),
  password: z
    .string({ invalid_type_error: "Invalid password" })
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string({ invalid_type_error: "Invalid password" })
    .min(8, "Password must be at least 8 characters long"),
});

export default async function createUserEmailPassword(
  _prevState: unknown,
  formData: FormData
) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  if (password !== confirmPassword) {
    return {
      errors: {
        password: ["passwords do not match"],
        confirmPassword: ["passwords do not match"],
      },
    };
  }
  const validatedFields = registerSchema.safeParse({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "users", userCredential.user.uid), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      uid: userCredential.user.uid,
      role: "user",
      joinedAt: userCredential.user.metadata.creationTime,
      avatar: userCredential.user.photoURL
    });
    return {
      success: `Account created for ${userCredential?.user.email}`,
    };
  } catch (error) {
    const err = error as AuthError;
    console.log(err.message);
    return {
      error: err.message,
    };
  }
}

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    const err = error as AuthError;
    return {
      error: err.message,
    };
  }
};

const loginSchema = z.object({
  email: z.string().email("Invalid Email").trim(),
  password: z.string({ invalid_type_error: "Invalid password" }),
});

export const loginUserEmailPassword = async (
  _prevState: unknown,
  formData: FormData
) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const validatedFields = loginSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return {
      success: "Logged In",
    };
  } catch (error) {
    const err = error as AuthError;
    return {
      error: err.message,
    };
  }
};

export const loginUserGoogle = async () => {
  try {
    const { user } = await signInWithPopup(auth, provider);
    try {
      const userDB = await getDoc(doc(db, "users", user.uid));
      if (userDB.exists()) return;
      await setDoc(doc(db, "users", user.uid), {
        firstName: user.displayName?.split(" ")[0],
        lastName: user.displayName?.split(" ")[1],
        email: user.email,
        uid: user.uid,
        role: "user",
        joinedAt: user.metadata.creationTime,
        avatar:user.photoURL
      });
    } catch (error) {
      console.log(error);
      return {
        error: "Error signing in with google",
      };
    }
  } catch (error) {
    const err = error as AuthError;
    return {
      error: err.message,
    };
  }
};
