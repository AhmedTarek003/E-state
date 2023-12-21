import { useState } from "react";
import style from "./Header.module.css";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaUserEdit } from "react-icons/fa";
import { MdCreate, MdHome } from "react-icons/md";
import { RiListIndefinite } from "react-icons/ri";
import { RxExit } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import { searchActions } from "../../redux/Sices/searchSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(false);

  const searchSub = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("search", search);
    const searchQuery = urlParams.toString();
    navigate(`/listings?${searchQuery}`);
    dispatch(searchActions.getSearchWord(search));
  };

  return (
    <div className={style.header}>
      <div className={style.container}>
        <div className={style.header_left}>
          <Link to={"/"} className={style.logo}>
            E-state
          </Link>
          <div className={style.search}>
            <form onSubmit={searchSub} className={style.search_form}>
              <input
                type="text"
                className={style.search_bar}
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className={style.searchBtn}>
                <BsSearch />
              </button>
            </form>
          </div>
        </div>
        <div className={style.nav}>
          <Link to={"/"} className={style.nav_link}>
            Home
          </Link>
          <Link to={"/listings"} className={style.nav_link}>
            Listings
          </Link>
        </div>
        <div className={style.header_right}>
          <img
            src={
              user
                ? user?.profileUser?.url
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            className={style.profile_image}
            alt=""
            onClick={() => setMenu(!menu)}
          />
        </div>
        {menu && (
          <div className={style.menu}>
            <ul className={style.menu_lists}>
              <Link to={`/profile/${user?._id}`} className={style.menu_list}>
                <FaUser />
                Profile
              </Link>
              <Link to={"/create-listing"} className={style.menu_list}>
                <MdCreate />
                Create Listing
              </Link>
              <Link to={"/"} className={style.menu_list}>
                <MdHome />
                Home
              </Link>
              <Link to={"/listings"} className={style.menu_list}>
                <RiListIndefinite />
                Listings
              </Link>
              {!user?.isGoogle && (
                <Link to={`/edit-profile/233`} className={style.menu_list}>
                  <FaUserEdit />
                  Edit Profile
                </Link>
              )}

              <hr />
              <div
                className={style.logout}
                onClick={() => dispatch(logoutUser())}
              >
                <RxExit />
                Logout
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
