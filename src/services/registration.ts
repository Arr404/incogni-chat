// firebase/userService.ts
import { User } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "./init";

export interface UserData {
    gender: string;
    dateOfBirth: Timestamp;
    email: string;
    displayName: string | null;
    photoURL: string | null;
    createdAt: Timestamp;
}

export const saveUserProfile = async (
    user: User,
    gender: string,
    dateOfBirth: Date | null
): Promise<void> => {
    if (!user) {
        throw new Error("User is required");
    }

    if (!gender) {
        throw new Error("Gender is required");
    }

    if (!dateOfBirth || !(dateOfBirth instanceof Date) || isNaN(dateOfBirth.getTime())) {
        throw new Error("Valid date of birth is required");
    }

    // Convert JavaScript Date objects to Firestore Timestamps
    const userData: UserData = {
        gender,
        dateOfBirth: Timestamp.fromDate(dateOfBirth),
        email: user.email || "",
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: Timestamp.now()
    };

    // Save to Firestore with user's UID as document ID
    await setDoc(doc(db, "users", user.uid), userData);
};
