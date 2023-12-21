import { toast } from "react-toastify";
import { request } from "../../utils/reques";
import { authActions } from "../Sices/authSlice";

// SignIn User
export function signInUser(info) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(`auth/signIn`, info);
      if (data) {
        localStorage.setItem("UserInfo", JSON.stringify(data));
      }
      dispatch(authActions.authUser(data));
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
// SignUp User
export function signUpUser(info) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(`auth/signUp`, info, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(authActions.getRegisterMSG(data.msg));
      toast.success(data.msg);
      setTimeout(() => {
        dispatch(authActions.clearRegisterMSG());
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}
// Verify Account
export function verifyAccount(userId, token) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`auth/${userId}/verify/${token}`);
      dispatch(authActions.getVerifyMSG(data.msg));
    } catch (error) {
      console.log(error);
    }
  };
}
// ِ Auth User With Google
export function authGoogleUser(info) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(`auth/google`, info);
      if (data) {
        localStorage.setItem("UserInfo", JSON.stringify(data));
      }
      dispatch(authActions.authUser(data));
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
}
// Logout User
export function logoutUser() {
  return async (dispatch) => {
    dispatch(authActions.logoutUser());
    localStorage.removeItem("UserInfo");
  };
}
