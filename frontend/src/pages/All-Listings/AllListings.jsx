import style from "./allListings.module.css";
import Header from "../../components/Header/Header";
import ListingsList from "../../components/ListingsList/ListingsList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllListings,
  getAllListingsWithFilter,
} from "../../redux/apiCalls/listingsApiCall";

const AllListings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useSelector((state) => state.search);
  const [sidebarData, setSidebarData] = useState({
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "price",
  });
  // OnChange Handler
  const onChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "sell" ||
      e.target.id === "rent"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({ ...sidebarData, [e.target.id]: e.target.checked });
    }
    if (e.target.id === "sort") {
      setSidebarData({ ...sidebarData, sort: e.target.value });
    }
  };
  const { listings } = useSelector((state) => state.listing);
  // get All Listing
  useEffect(() => {
    if (search) {
      dispatch(getAllListingsWithFilter(`search=${search}`));
    } else {
      dispatch(getAllListings());
    }
  }, [dispatch, search]);

  // Submit Handler
  const submitHandler = () => {
    const urlParams = new URLSearchParams();
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    if (search) {
      urlParams.set("search", search);
    }
    const searchQuery = urlParams.toString();
    dispatch(getAllListingsWithFilter(searchQuery));
    navigate(`/listings?${searchQuery}`);
  };

  return (
    <section>
      <Header />
      <div className={style.container}>
        <div className={style.sidebar}>
          <div>
            <div className={style.listing_options}>
              <span className={style.option_title}>Type:</span>
              <div className={style.house_info_group}>
                <input
                  type="checkbox"
                  id="all"
                  className={style.checkbox}
                  checked={sidebarData.type === "all"}
                  onChange={onChange}
                />
                <label htmlFor="all" className={style.checkbox_label}>
                  Sell & Rent
                </label>
              </div>
              <div className={style.house_info_group}>
                <input
                  type="checkbox"
                  id="sell"
                  className={style.checkbox}
                  checked={sidebarData.type === "sell"}
                  onChange={onChange}
                />
                <label htmlFor="sell" className={style.checkbox_label}>
                  Sell
                </label>
              </div>
              <div className={style.house_info_group}>
                <input
                  type="checkbox"
                  id="rent"
                  className={style.checkbox}
                  checked={sidebarData.type === "rent"}
                  onChange={onChange}
                />
                <label htmlFor="rent" className={style.checkbox_label}>
                  Rent
                </label>
              </div>
            </div>
            <div className={style.listing_options}>
              <span className={style.option_title}>Amenities:</span>
              <div className={style.house_info_group}>
                <input
                  type="checkbox"
                  id="parking"
                  className={style.checkbox}
                  checked={sidebarData.parking}
                  onChange={onChange}
                />
                <label htmlFor="parking" className={style.checkbox_label}>
                  Parking
                </label>
              </div>
              <div className={style.house_info_group}>
                <input
                  type="checkbox"
                  id="furnished"
                  className={style.checkbox}
                  checked={sidebarData.furnished}
                  onChange={onChange}
                />
                <label htmlFor="furnished" className={style.checkbox_label}>
                  Furnished
                </label>
              </div>
            </div>
            <div className={style.listing_options_offer}>
              <div className={style.house_info_group}>
                <input
                  type="checkbox"
                  id="offer"
                  className={style.checkbox}
                  checked={sidebarData.offer}
                  onChange={onChange}
                />
                <label htmlFor="offer" className={style.checkbox_label}>
                  Offer
                </label>
              </div>
            </div>
            <div className={style.listing_sort}>
              <select
                className={style.select}
                id="sort"
                onChange={onChange}
                value={sidebarData.sort}
              >
                <option value="price">low Price</option>
                <option value="-price">High Price</option>
                <option value="createdAt">Oldest</option>
              </select>
            </div>
            <button className={style.search_btn} onClick={submitHandler}>
              Search
            </button>
          </div>
        </div>
        <div className={style.listing_content}>
          <h1 className={style.listing_title}>Listing Results : </h1>
          {listings.length > 0 ? (
            <ListingsList listings={listings} />
          ) : (
            <div className={style.noListings}>No Listings</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllListings;
