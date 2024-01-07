import { useState } from "react";
import style from "./signIn.module.css";
import { Link } from "react-router-dom";
import OAuth from "../../components/OAuth/OAuth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../redux/apiCalls/authApiCall";
import Loader from "../../components/Loader/Loader";

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading } = useSelector((state) => state.auth);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("email is required");
    if (password.trim() === "") return toast.error("password is required");

    dispatch(signInUser({ email, password }));
  };

  return (
    <section className={style.signIn}>
      <div className={style.overlay}>
        <div className={style.title}>Sign In</div>
        <div className={style.container}>
          <form onSubmit={formSubmitHandler} className={style.form}>
            <div className={style.form_group}>
              <label className={style.form_label}>Email</label>
              <input
                type="email"
                placeholder="enter your email"
                className={style.from_input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={style.form_group}>
              <label className={style.form_label}>Password</label>
              <input
                type="password"
                placeholder="enter your password"
                className={style.from_input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className={style.form_btn}>
              Sign In
            </button>
          </form>
          <OAuth />
          <div className={style.ask}>
            <div className="signUp" style={{ marginBottom: "5px" }}>
              Don't have an account?{" "}
              <Link to={"/signUp"} className={style.link}>
                Sign Up
              </Link>
            </div>
            <Link to={"/forgot-password"} className={style.link}>
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </section>
  );
};

export default SignIn;
