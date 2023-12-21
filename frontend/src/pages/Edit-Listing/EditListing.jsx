import { useEffect } from "react";
import Header from "../../components/Header/Header";
import style from "./editListing.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleListingById } from "../../redux/apiCalls/listingsApiCall";
import EditListingForm from "../../components/EditListings/EditListingForm";
import Loader from "../../components/Loader/Loader";

const EditListing = () => {
  const dispatch = useDispatch();
  const { listing } = useSelector((state) => state.listing);
  const { loading } = useSelector((state) => state.listing);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getSingleListingById(id));
  }, [dispatch, id]);

  return (
    <section>
      <Header />
      {
        <div className={style.edit_listing}>
          <div className={style.title}>Edit Listing</div>
          {listing && <EditListingForm listing={listing} id={id} />}
          {loading && <Loader />}
        </div>
      }
    </section>
  );
};

export default EditListing;
