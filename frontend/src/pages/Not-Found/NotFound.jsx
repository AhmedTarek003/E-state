import { Link } from "react-router-dom";
import style from "./notFound.module.css";

const NotFound = () => {
  return (
    <div className={style.notFound}>
      <h1 className={style.notFound_title}>This page not found</h1>
      <Link to={"/"} className={style.home_link}>
        Go to home
      </Link>
    </div>
  );
};

export default NotFound;
