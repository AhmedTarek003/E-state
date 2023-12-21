import style from "./footer.module.css";
import {
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaLocationDot,
  FaPhone,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <div className={style.footer_container}>
      <div className={style.footer_left}>
        <h1 className={style.name}>E-state</h1>
        <div className={style.social}>
          <FaFacebookF className={style.social_icon} />
          <FaXTwitter className={style.social_icon} />
          <FaInstagram className={style.social_icon} />
        </div>
        <p className={style.text}>
          this is our social, <br /> follow us to know every thing about real
          state
        </p>
      </div>
      <div className={style.footer_right}>
        <div className={style.contact}>
          <FaLocationDot className={style.contact_icon} /> Egypt
        </div>
        <div className={style.contact}>
          <FaClock className={style.contact_icon} /> Business Hours: From 10:00
          am To 8:00 pm
        </div>
        <div className={style.contact}>
          <FaPhone className={style.contact_icon} /> 444 444 4444
        </div>
      </div>
    </div>
  );
};

export default Footer;
