import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../../../firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { loadingError } from "../errors/errors.actions";


// google sign in
const provider = new GoogleAuthProvider();

const googleSignIn = createAsyncThunk("google/signIn", async (options, thunkAPI) => {
  try {
    const { user } = await signInWithPopup(auth, provider);
    const currentUser = await getDoc(query(doc(db, "users", `${user?.uid}`)));

    const querySnapshot = await getDocs(query(
      collection(db, "workspaces"),
      where("owner", "==", `${user?.uid}`)
    ));

    const isExistUser = currentUser?.data()?.id;
    if (!isExistUser) {
      const customer = await stripe.customers.create({
        email: auth.currentUser?.email,
        name: auth.currentUser?.displayName,
      }); 
      // console.log(customer)
      await setDoc(doc(db, "users", `${auth.currentUser?.uid}`), {
        firstName: auth.currentUser?.displayName?.split(" ")[0],
        lastName: auth.currentUser?.displayName?.split(" ")[1],
        email: auth.currentUser?.email,
        agree_privacy: true,
        dateRegistration: serverTimestamp(),
        id: auth?.currentUser?.uid,
        customerId: customer.id,
        language: options.lg,
        quickSave: "Cloud storage",
        settings: {
          emailNotifications: true,
          viewOnMyVideos: false,
          newCommentOnMyPosts: true,
          newAnsverOnMyComment: true,
          someoneIsSharingMyContent: false,
          folderUpdates: false,
        },

      })

      const workspaceId = uuidv4()
      await setDoc(doc(db, "workspaces", workspaceId), {
        name: 'My_Workspace',
        folders: [{ name: 'My_Folder', id: uuidv4(), dateUpdated: new Date() , dateCreated: new Date()}],
        id: workspaceId,
        createAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        owner: auth.currentUser?.uid,
        users: [],
        color: {
          id: 0,
          hex: '#28A1FF'
        },
        confidentiality: {
          inviteNew: 'Only owner',
          downloadFiles: 'Only owner',
          shareFiles: 'Only owner'
        },
        plan: {
          productName: "Free",
          priceId: null,
          subscriptionId: null,
          interval: null,
          status: 'active',
          purchaseID: null,
          transactionDate: null
        }
      });
    };
      await updateDoc(doc(db, "users", `${user?.uid}`), {
        avatarUrl: auth?.currentUser?.photoURL
      });
  
      querySnapshot.forEach(async (doc) => {
        const workspaceRef = doc.ref;
        const workspaceData = doc.data();      
        if (!workspaceData.updatedAt) {
          await updateDoc(workspaceRef, {
            updatedAt: serverTimestamp(),
            // confidentiality: {
            //   inviteNew: 'Only owner',
            //   downloadFiles: 'Only owner',
            //   shareFiles: 'Only owner'
            // }
          });
        }
      });

      return user;
    } catch (error) {
      thunkAPI.dispatch(
        loadingError(
          error?.message?.includes("email-already")
            ? { message: "Email exists" }
            : error?.message?.includes("wrong-password")
            ? { message: "Invalid Password!" }
            : error
        )
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// google sign out

const googleSignOut = createAsyncThunk(
  "google/signOut",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error) {
      thunkAPI.dispatch(loadingError(error?.message));
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// register

const register = createAsyncThunk(
  "auth/register",
  async (options, thunkAPI) => {
    const {
      email,
      password,
      firstName,
      lastName,
      agree_privacy,
      lg,
    } = options;
   
    try {
      const {user} = await createUserWithEmailAndPassword(auth, email, password);
       await updateProfile(user, { displayName: `${firstName} ${lastName}` });

      
      thunkAPI.dispatch(
        loadingError({
          message: "Email sent successfully! Confirm your email address.",
        })
      );

      await setDoc(doc(db, "users", `${auth.currentUser?.uid}`), {
        firstName,
        lastName,
        email,
        agree_privacy,
        language: lg,
        avatarUrl: auth?.currentUser?.photoURL,
        experience: 'Намає досвіду',
        phones: [],
        dateRegistration: serverTimestamp(),
        id: auth?.currentUser?.uid,
      });
      
  

      await sendEmailVerification(auth?.currentUser);  
   
      
      return 'done';
    } catch (error) {
      thunkAPI.dispatch(
        loadingError(
          error?.message?.includes("email-already")
            ? { message: "Email exists" }
            : error?.message?.includes("wrong-password")
            ? { message: "Invalid Password!" }
            : error
        )
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// login
const logIn = createAsyncThunk("auth/login", async (options, thunkAPI) => {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      options?.email,
      options?.password
    );
    if(!user.emailVerified) {
      thunkAPI.dispatch(
        loadingError({ message: "Waiting for verification!" })
      )
      return
    }



    return user;
  } catch (error) {
    thunkAPI.dispatch(
      loadingError(
        error?.message?.includes("wrong-password")
          ? { message: "Invalid Password!" }
          : error?.message?.includes("user-not-found")
          ? { message: "User not exist!" }
          : error
      )
    );
    return thunkAPI.rejectWithValue(error);
  }
});

//recovery Password

const recoveryPassword = createAsyncThunk(
  "auth/recovery",
  async (email, thunkAPI) => {
    try {
      await sendPasswordResetEmail(auth, email);
      thunkAPI.dispatch(
        loadingError({ message: "Email has been sent successfully!" })
      );
    } catch (error) {
      thunkAPI.dispatch(loadingError(error));
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const authActions = {
  register,
  logIn,
  googleSignIn,
  googleSignOut,
  recoveryPassword,
};

export default authActions;
