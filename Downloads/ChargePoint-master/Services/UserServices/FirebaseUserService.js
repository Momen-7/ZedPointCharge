import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebaseApp from "../../FirebaseConfig"; // Ensure your Firebase app is initialized here.

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const firestore = getFirestore(firebaseApp);

class FirebaseUserService {
  // Register a new user
  static async registerUser(userRegisterDTO) {
    const { email, password, confirmPassword, ...userData } = userRegisterDTO;

    if (!email || !password || !confirmPassword) {
      return { success: false, message: "Missing required fields." };
    }

    if (password !== confirmPassword) {
      return { success: false, message: "Passwords do not match." };
    }

    try {
      // Check if the user already exists in Firestore
      const usersCollection = collection(firestore, "users");
      const userQuery = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        return {
          success: false,
          message: "User with this email already exists.",
        };
      }

      // Register user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid } = userCredential.user;

      // Add user data to Firestore
      await setDoc(doc(firestore, "users", uid), { ...userData, email });

      return {
        success: true,
        message: "User registered successfully.",
        uid,
        ...userData,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Log in an existing user
  static async loginUser(userLoginDTO) {
    try {
      const { email, password } = userLoginDTO;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return {
        success: true,
        message: "Login successful.",
        user: userCredential.user,
      };
    } catch (error) {
      if (error.code) {
        switch (error.code) {
          case "auth/user-not-found":
            return {
              success: false,
              message: "User not found. Please register first.",
            };
          case "auth/wrong-password":
            return {
              success: false,
              message: "Incorrect password. Try again.",
            };
          default:
            return { success: false, message: error.message };
        }
      }
      return { success: false, message: "Unexpected error occurred." };
    }
  }

  // Update user data
  static async updateUser(userId, updateUserDTO) {
    if (!userId || !updateUserDTO) {
      return { success: false, message: "Missing userId or update data." };
    }

    try {
      const userRef = doc(firestore, "users", userId);
      await updateDoc(userRef, updateUserDTO);

      return {
        success: true,
        message: "User updated successfully.",
        id: userId,
        ...updateUserDTO,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Retrieve user data
  static async getUser(getUserDTO) {
    const { userId } = getUserDTO;

    if (!userId) {
      return { success: false, message: "Missing userId." };
    }

    try {
      const userRef = doc(firestore, "users", userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        return { success: false, message: "User not found." };
      }

      return {
        success: true,
        message: "User retrieved successfully.",
        data: { id: userDoc.id, ...userDoc.data() },
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Update user rates
  static async updateUserRate(userId, updateUserRateDto) {
    if (!userId || !updateUserRateDto) {
      return { success: false, message: "Missing userId or rate data." };
    }

    try {
      const userRef = doc(firestore, "users", userId);
      await updateDoc(userRef, { rates: updateUserRateDto.rate });

      return {
        success: true,
        message: "User rate updated successfully.",
        id: userId,
        rates: updateUserRateDto.rate,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default FirebaseUserService;
