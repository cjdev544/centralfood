import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const auth = useSelector((state) => state.auth);

  const logoutAuth = () => {
    removeToken();
    dispatch(logoutUser());
    dispatch(setUser(null));
  };

  useEffect(() => {
    if (!auth?.user) {
      const token = getToken();
      if (token) {
        const jwtDeco = jwtDecode(token);
        dispatch(authUser({ uid: jwtDeco.id, jwt: token }));
        dispatch(getUser(logoutAuth));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!auth?.addresses) {
      const token = getToken();
      if (token && auth?.uid) {
        dispatch(getApiAddress(auth?.uid));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const getDataUser = () => {
    if (!auth?.addresses) {
      const token = getToken();
      if (token && auth?.uid) {
        dispatch(getApiAddress(auth?.uid));
      }
    }
  };

  return {
    getDataUser,
  };
};
