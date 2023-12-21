import style from "./oAuth.module.css";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { authGoogleUser } from "../../redux/apiCalls/authApiCall";

const OAuth = () => {
  const dispatch = useDispatch();
  const google = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      dispatch(
        authGoogleUser({
          username: result?.user?.displayName,
          email: result?.user?.email,
          image: result?.user?.photoURL,
        })
      );
    } catch (error) {
      console.log("google error: " + error);
    }
  };
  return (
    <button className={style.google_btn} onClick={google}>
      <FcGoogle />
      continue With Google
    </button>
  );
};

export default OAuth;
