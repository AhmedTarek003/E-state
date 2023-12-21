import { useState } from "react";
import style from "./forgotPass.module.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { sendResetPassLink } from "../../redux/apiCalls/passwordApiCall";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  // form submit handler
  const formSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("email is required");
    dispatch(sendResetPassLink({ email }));
  };
  return (
    <section>
      <div className={style.container}>
        <h1 className={style.title}>Forget Password</h1>
        <form onSubmit={formSubmit} className={style.form}>
          <label className={style.label}>email</label>
          <input
            type="email"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={style.input}
          />
          <button type="submit" className={style.formBtn}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
