import { toast } from "react-toastify";
import { request } from "../../utils/reques";
import { userActions } from "../Sices/userSlice";
import { authActions } from "../Sices/authSlice";

// get User with User Id
export function getUserById(id) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`users/${id}`);
      dispatch(userActions.getUser(data));
    } catch (error) {
      console.log(error);
    }
  };
}
// Update User with User Id
export function updateUserById(id, info) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`users/${id}`, info, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      const user = JSON.parse(localStorage.getItem("UserInfo"));
      if (user) {
        user.username = data && data.username;
        user.email = data && data.email;
        localStorage.setItem("UserInfo", JSON.stringify(user));
      }

      dispatch(userActions.getUser(data));
      toast.success("Updated Successfully");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
// Update User Image
export function updateUserImage(id, image) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`users/profile-image/${id}`, image, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      const user = JSON.parse(localStorage.getItem("UserInfo"));
      if (user) {
        user.profileUser.url = data && data.profileUser.url;
        // console.log(user);
        localStorage.setItem("UserInfo", JSON.stringify(user));
      }
      toast.success("Updated Successfully");
      dispatch(userActions.getUser(data));
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
// delete User with User Id
export function deleteUserById(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`users/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(userActions.getMsg(data.msg));
      dispatch(authActions.logoutUser());
      localStorage.removeItem("UserInfo");
      toast.success(data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
