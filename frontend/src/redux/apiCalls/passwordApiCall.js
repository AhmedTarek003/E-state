import { toast } from "react-toastify";
import { passActions } from "../Sices/passwordSlice";
const { request } = require("../../utils/reques");

// Send Reset password link
export function sendResetPassLink(email) {
  return async () => {
    try {
      const { data } = await request.post("password/reset_pass_link", email);
      toast.success(data.msg);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}
// Send Reset password link
export function checkResetPassLink(userId, token) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(
        `password/${userId}/reset-password/${token}`
      );
      toast.success(data.msg);
    } catch (error) {
      console.log(error);
      dispatch(passActions.errPassMsg(error.response.data.msg));
    }
  };
}
//  Reset password
export function resetPass(userId, token, password) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(
        `password/${userId}/reset-password/${token}`,
        password
      );
      dispatch(passActions.newPassMsg(data.msg));
      toast.success(data.msg);
      setTimeout(() => {
        dispatch(passActions.newPassMsg(data.msg));
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}
