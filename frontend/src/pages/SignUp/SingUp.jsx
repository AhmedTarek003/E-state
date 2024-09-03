import { useEffect, useState } from "react";
import style from "./signUp.module.css";
import OAuth from "../../components/OAuth/OAuth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../redux/apiCalls/authApiCall";

const SingUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerMSG } = useSelector((state) => state.auth);
  console.log(registerMSG);

  useEffect(() => {
    if (registerMSG) {
      navigate("/signIn");
    }
  }, [registerMSG, navigate]);

  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error("userName is required");
    if (email.trim() === "") return toast.error("email is required");
    if (password.trim() === "") return toast.error("password is required");
    if (confirmPassword.trim() === "")
      return toast.error("confirm passwor is required");
    if (password !== confirmPassword)
      return toast.error("password isn't match");
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      formData.append("image", image);
    }
    dispatch(signUpUser(formData));
  };
  return (
    <section className={style.singUp}>
      <div className={style.overlay}>
        <div className={style.title}>Sign Up</div>
        <div className={style.container}>
          <div className={style.profile_image}>
            <label htmlFor="profile-image" className={style.profiel_label}>
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                }
                alt=""
                className={style.profile_img}
              />
            </label>
            <input
              type="file"
              id="profile-image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <form onSubmit={formSubmitHandler} className={style.form}>
            <div className={style.form_group}>
              <label className={style.form_label}>username</label>
              <input
                type="text"
                name="username"
                placeholder="enter your name"
                className={style.from_input}
                value={username}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={style.form_group}>
              <label className={style.form_label}>Email</label>
              <input
                type="email"
                name="email"
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
            <div className={style.form_group}>
              <label className={style.form_label}>Confirm Password</label>
              <input
                type="password"
                placeholder="confirm password"
                className={style.from_input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className={style.form_btn}>
              Sign Up
            </button>
          </form>
          <OAuth />
          <div className={style.ask}>
            <div className="signUp" style={{ marginBottom: "5px" }}>
              Already have an account?{" "}
              <Link to={"/signIn"} className={style.link}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingUp;
