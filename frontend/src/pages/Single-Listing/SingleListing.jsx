import style from "./singleListing.module.css";
import Header from "../../components/Header/Header";
import Slider from "../../components/Slider/Slider";
import { FaBath, FaBed, FaLocationDot, FaSquareParking } from "react-icons/fa6";
import { MdTableBar } from "react-icons/md";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteListingById,
  getSingleListingById,
} from "../../redux/apiCalls/listingsApiCall";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";

const SingleListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listing } = useSelector((state) => state.listing);
  const { loading } = useSelector((state) => state.listing);
  const { msg } = useSelector((state) => state.listing);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  const [contact, setContact] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const deleteHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will DELETE your Listing!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteListingById(id));
      }
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getSingleListingById(id));
    if (msg) {
      navigate("/listings");
    }
  }, [dispatch, id, msg, navigate]);

  const formHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "") return toast.warn("Please enter a your name");
    if (email.trim() === "")
      return toast.warn("Please enter a your email address");
    if (message.trim() === "") return toast.warn("Please write a your message");
    toast.success("send message");
    setName("");
    setEmail("");
    setMessage("");
    setContact(false);
  };
  return (
    <section>
      <Header />
      <Slider images={listing?.listingImages} />
      <div className={style.container}>
        <div className={style.container_info}>
          <div className={style.listing_info}>
            <div className={style.listing_name}>{listing?.name}</div>
            <div className={style.listing_address}>
              <FaLocationDot style={{ color: "var(--dark-green)" }} />
              {listing?.address}
            </div>
            <div className={style.about_listing}>
              <li className={style.listing_adva}>
                <FaBed className={style.adva_icon} /> {listing?.beds}
              </li>
              <li className={style.listing_adva}>
                <FaBath className={style.adva_icon} /> {listing?.baths}
              </li>
              {listing?.parking && (
                <li className={style.listing_adva}>
                  <FaSquareParking className={style.adva_icon} /> Parking
                </li>
              )}
              {listing?.furnished && (
                <li className={style.listing_adva}>
                  <MdTableBar className={style.adva_icon} /> Furnished
                </li>
              )}
            </div>
            <div className={style.house_info}>
              <div className={style.house_type}>{listing?.type}</div>
              {listing?.offer ? (
                <div className={style.house_price}>
                  <del style={{ color: "gray" }}>{listing?.price}$ </del>
                  {listing?.price - listing?.discountPrice}$/month
                </div>
              ) : (
                <div className={style.house_price}>{listing?.price}$/month</div>
              )}
            </div>
          </div>
          {listing?.userId === user?._id && (
            <div className={style.listing_options}>
              <Link to={`/edit-listing/${listing?._id}`}>
                <FiEdit
                  style={{ color: "#07f373" }}
                  className={style.option_icon}
                />
              </Link>
              <FiTrash2
                style={{ color: "red" }}
                className={style.option_icon}
                onClick={deleteHandler}
              />
            </div>
          )}
        </div>

        <div className={style.listing_desc}>
          Description:
          <p>{listing?.desc}</p>
        </div>
        {!contact && (
          <button
            className={style.contact_btn}
            onClick={() => setContact(true)}
          >
            Contact Landlord
          </button>
        )}
        {contact && (
          <form onSubmit={formHandler} className={style.contact_form}>
            <h1 className={style.contact_title}>Contact LandLord</h1>
            <div className={style.contact_form_group}>
              <label className={style.contact_form_label}>Name</label>
              <input
                type="text"
                placeholder="enter your name"
                className={style.contact_form_input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={style.contact_form_group}>
              <label className={style.contact_form_label}>Email</label>
              <input
                type="email"
                placeholder="enter your email"
                className={style.contact_form_input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={style.contact_form_group}>
              <label className={style.contact_form_label}>message</label>
              <textarea
                placeholder="your message"
                className={style.contact_form_textarea}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className={style.form_btns}>
              <button type="submit" className={style.form_sub}>
                Send
              </button>
              <button
                type="button"
                className={style.form_cancel}
                onClick={() => setContact(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      {loading && <Loader />}
    </section>
  );
};

export default SingleListing;
