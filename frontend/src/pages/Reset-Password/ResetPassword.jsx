import { useEffect, useState } from "react";
import style from "./resetPass.module.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  checkResetPassLink,
  resetPass,
} from "../../redux/apiCalls/passwordApiCall";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../Not-Found/NotFound";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newPassMsg } = useSelector((state) => state.pass);
  const { errPassMsg } = useSelector((state) => state.pass);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(checkResetPassLink(userId, token));
    if (newPassMsg) {
      navigate("/signIn");
    }
  }, [dispatch, userId, token, newPassMsg, navigate]);

  // form submit handler
  const formSubmit = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("password is required");
    if (confirmPassword.trim() === "")
      return toast.error("confirm password is required");
    if (password !== confirmPassword) {
      return toast.error("password not match");
    }
    dispatch(resetPass(userId, token, { password }));
  };
  return (
    <section>
      {errPassMsg ? (
        <NotFound />
      ) : (
        <div className={style.container}>
          <h1 className={style.title}>Reset Password</h1>
          <form onSubmit={formSubmit} className={style.form}>
            <div className={style.form_group}>
              <label className={style.label}>new password</label>
              <input
                type="password"
                placeholder="enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={style.input}
              />
            </div>
            <div className={style.form_group}>
              <label className={style.label}>Confirm password</label>
              <input
                type="password"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={style.input}
              />
            </div>
            <button type="submit" className={style.formBtn}>
              Reset
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default ResetPassword;
