import { Link } from "react-router-dom";
import style from "./listings.module.css";
import { FaLocationDot } from "react-icons/fa6";

const ListingsList = ({ listings }) => {
  return (
    <div className={style.all_listings}>
      {listings?.map((listing) => (
        <Link
          to={`/single-listing/${listing?._id}`}
          className={style.listing_item}
          key={listing?._id}
        >
          <img
            src={listing?.listingImages[0]?.url}
            alt=""
            className={style.listing_image}
          />
          <div className={style.listing_info}>
            <div className={style.listing_name}>{listing?.name}</div>
            <div className={style.listing_address}>
              <FaLocationDot className={style.address_icon} />
              {listing?.address}
            </div>
            <p className={style.listing_desc}>{listing?.desc}</p>
            <div className={style.listing_price}>
              {listing?.offer
                ? listing?.price - listing?.discountPrice
                : listing?.price}
              ${listing?.type === "rent" && "/month"}
            </div>
            <div className={style.listing_options}>
              <div className={style.listing_opt}>{listing?.beds} Beds</div>
              <div className={style.listing_opt}>{listing?.baths} Baths</div>
              {listing?.parking && (
                <div className={style.listing_opt}>Parking</div>
              )}
              {listing?.furnished && (
                <div className={style.listing_opt}>Furnished</div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListingsList;
