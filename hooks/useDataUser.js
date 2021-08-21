import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getToken, removeToken } from "../helpers/token";
import {
  authUser,
  getApiAddress,
  getUser,
  logoutUser,
  setUser,
} from "../redux/actions/auth";

export const useDataUser = () => {
  const dispatch = useDispatch();

  const logoutAuth = () => {
    removeToken();
    dispatch(logoutUser());
    dispatch(setUser(null));
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      const jwtDeco = jwtDecode(token);
      dispatch(authUser({ uid: jwtDeco.id, jwt: token }));
      dispatch(getUser(logoutAuth));
    }
  }, []);

  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(getApiAddress());
    }
  }, []);
};
