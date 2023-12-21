import style from "./editProfile.module.css";
import Header from "../../components/Header/Header";
import { useState } from "react";
import { toast } from "react-toastify";
import { BsFillCameraFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserById,
  updateUserImage,
} from "../../redux/apiCalls/userApiCall";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [username, setName] = useState(user?.username);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error("userName is required");
    if (username) {
      dispatch(updateUserById(user?._id, { username }));
    }
    if (email) {
      dispatch(updateUserById(user?._id, { email }));
    }
    if (password) {
      dispatch(updateUserById(user?._id, { password }));
    }
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      dispatch(updateUserImage(user?._id, formData));
    }
  };
  return (
    <section>
      <Header />
      <div className={style.edit_title}>Edit Profile</div>
      <div className={style.container}>
        <div className={style.profile_image}>
          <img
            src={image ? URL.createObjectURL(image) : user?.profileUser?.url}
            alt=""
            className={style.profile_img}
          />
          <label htmlFor="profile-image" className={style.profiel_label}>
            <BsFillCameraFill />
          </label>
          <input
            type="file"
            id="profile-image"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <form onSubmit={formSubmitHandler} className={style.edit_form}>
          <div className={style.edit_form_group}>
            <label className={style.edit_label}>username</label>
            <input
              type="text"
              placeholder="enter your name"
              className={style.edit_input}
              value={username}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={style.edit_form_group}>
            <label className={style.edit_label}>Email</label>
            <input
              type="email"
              placeholder="enter your email"
              className={style.edit_input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={style.edit_form_group}>
            <label className={style.edit_label}>Password</label>
            <input
              type="password"
              placeholder="enter your password"
              className={style.edit_input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={style.edit_btn}>
            Edit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
