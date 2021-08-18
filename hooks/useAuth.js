import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_PATH } from "../helpers/constats";
import { getToken, removeToken } from "../helpers/token";
import {
  authUser,
  loginApi,
  logoutUser,
  registerApi,
  getUser,
} from "../redux/actions/auth";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const jwtDeco = jwtDecode(token);
      dispatch(authUser({ uid: jwtDeco.id, jwt: token }));
      dispatch(getUser(logoutAuth));
    }
  }, []);
  console.log("render");
  const loginUser = (identifier, password) => {
    dispatch(loginApi(identifier, password));
  };

  const registerUser = (formData) => {
    dispatch(registerApi(formData));
  };

  const resetEmailApi = async (email) => {
    try {
      const url = `${BASE_PATH}/auth/forgot-password`;
      const params = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      };

      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const logoutAuth = () => {
    removeToken();
    dispatch(logoutUser());
  };

  return {
    auth,
    loginUser,
    registerUser,
    resetEmailApi,
    logoutAuth,
  };
};
