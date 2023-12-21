import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyAccount } from "../../redux/apiCalls/authApiCall";
import NotFound from "../Not-Found/NotFound";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, token } = useParams();
  const { verifyMSG } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyAccount(userId, token));
    if (verifyMSG) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [dispatch, userId, token, verifyMSG, navigate]);

  return (
    <div>{verifyMSG ? <h1>your account is verified</h1> : <NotFound />}</div>
  );
};

export default VerifyEmail;
