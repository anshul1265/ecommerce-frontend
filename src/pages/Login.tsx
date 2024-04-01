import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";

const Login = () => {

  const [gender, setGender] = useState("Male");
  const [date, setDate] = useState("");
  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender: gender,
        role: "user",
        dob: date,
        _id: user.uid,
      });
      if ("data" in res) {
        toast.success(res.data.message);
      }
      else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }
      console.log(user);
    } catch (error) {
      toast.error("Sign in failed.");
    }
  };

  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>
        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value={""}>Select Gender</option>
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
          </select>
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <p>Already Signed In?</p>
          <button onClick={loginHandler}>
            <FcGoogle /><span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  )
}

export default Login