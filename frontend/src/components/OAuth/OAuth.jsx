import style from "./oAuth.module.css";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { authGoogleUser } from "../../redux/apiCalls/authApiCall";
import Loader from "../Loader/Loader";

const OAuth = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
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
    <>
      <button className={style.google_btn} onClick={google}>
        <FcGoogle />
        continue With Google
      </button>
      {loading && <Loader />}
    </>
  );
};

export default OAuth;
