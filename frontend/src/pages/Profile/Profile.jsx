import style from "./profile.module.css";
import Header from "../../components/Header/Header";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteUserById, getUserById } from "../../redux/apiCalls/userApiCall";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { gUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);
  const deleteHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will DELETE your profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteUserById(id));
      }
    });
  };
  return (
    <section>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="this is user profile" />
      </Helmet>
      <Header />
      <div className={style.container}>
        <div className={style.profile_user}>
          <div className={style.profile_info}>
            <img
              src={gUser?.profileUser?.url}
              className={style.profile_image}
              alt=""
            />
            <div className={style.profile_username}>{gUser?.username}</div>
          </div>
          <div className={style.profile_options}>
            {!gUser?.isGoogle && (
              <Link to={`/edit-profile/${id}`}>
                <FiEdit
                  style={{ color: "#07f373" }}
                  className={style.option_icon}
                />
              </Link>
            )}
            <FiTrash2
              style={{ color: "red" }}
              className={style.option_icon}
              onClick={deleteHandler}
            />
          </div>
        </div>
        <div className={style.profile_listings}>
          <div className={style.listingTitle}>Your Listings</div>
          {gUser?.listings.length > 0 ? (
            <div className={style.listings_box}>
              {gUser?.listings?.map((listing) => (
                <Link
                  to={`/single-listing/${listing?._id}`}
                  className={style.listing}
                  key={listing?._id}
                >
                  <img
                    src={listing?.listingImages[0].url}
                    className={style.listing_image}
                    alt=""
                  />
                  <div className={style.listing_name}>{listing?.name}</div>
                </Link>
              ))}
            </div>
          ) : (
            <Link to={"/create-listing"} className={style.create_first_listing}>
              Create your first listing
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
