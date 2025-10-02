import { push, ref } from "firebase/database";
import { db } from "../../FirebaseConfig";

const addToFirebase = async (data: any) => {
    try {
        await push(ref(db, "students/"), data);
        console.log("Data saved to Firebase");
    } catch (error) {
        console.error("Firebase save error:", error);
        throw error;
    }
};
export default addToFirebase;