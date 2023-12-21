import { toast } from "react-toastify";
import { request } from "../../utils/reques";
import { listingActions } from "../Sices/listingSlice";

// get All Listings
export function getAllListings() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`listings`);
      dispatch(listingActions.getAllListings(data));
    } catch (error) {
      console.log(error);
    }
  };
}
// get All Listings with Filter
export function getAllListingsWithFilter(dataInfo) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`listings?${dataInfo}`);
      dispatch(listingActions.getAllListings(data));
    } catch (error) {
      console.log(error);
    }
  };
}
// get single Listing By Id
export function getSingleListingById(id) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`listings/${id}`);
      dispatch(listingActions.getSingleListing(data));
    } catch (error) {
      console.log(error);
    }
  };
}
// create Listing
export function createListing(info) {
  return async (dispatch, getState) => {
    try {
      dispatch(listingActions.startLoading());
      const { data } = await request.post(`listings`, info, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(listingActions.createListing(data.listing));
      dispatch(listingActions.endLoading());
      dispatch(listingActions.createdMSG(data.msg));
      toast.success(data.msg);
      setTimeout(() => {
        dispatch(listingActions.clearCreatedMSG());
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
    }
  };
}
// update Listing By Id
export function updateListingById(id, info) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`listings/${id}`, info, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(listingActions.getSingleListing(data));
      toast.success("Updated");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
// update Listing Images
export function updateListingImages(id, images) {
  return async (dispatch, getState) => {
    try {
      dispatch(listingActions.startLoading());
      const { data } = await request.put(
        `listings/update-listingImages/${id}`,
        images,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(listingActions.endLoading());
      dispatch(listingActions.getSingleListing(data));
      toast.success("Listing updated");
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
// Delete Listing By Id
export function deleteListingById(id) {
  return async (dispatch, getState) => {
    try {
      dispatch(listingActions.startLoading());
      const { data } = await request.delete(`listings/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(listingActions.createdMSG(data.msg));
      dispatch(listingActions.endLoading());
      toast.success(data.msg);
      setTimeout(() => {
        dispatch(listingActions.clearCreatedMSG(data.msg));
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
