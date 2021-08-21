import { useDispatch, useSelector } from "react-redux";
import { BASE_PATH } from "../helpers/constats";
import { removeToken } from "../helpers/token";
import {
  loginApi,
  logoutUser,
  registerApi,
  startUpdateUser,
  setUser,
  registerAddress,
  removeAddress,
  stratUpdateAddresss,
} from "../redux/actions/auth";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const loginUser = (identifier, password, setShowModal) => {
    dispatch(loginApi(identifier, password, setShowModal));
  };

  const registerUser = (formData, setShowModal) => {
    dispatch(registerApi(formData, setShowModal));
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
    dispatch(setUser(null));
  };

  const updateUser = (data) => {
    dispatch(startUpdateUser(auth.user.id, data));
  };

  const createAddress = (formData, setShowModal) => {
    dispatch(registerAddress(formData, setShowModal));
  };

  const deleteAddress = (addressId) => {
    dispatch(removeAddress(addressId));
  };

  const updateAddress = (address, setShowModal) => {
    dispatch(stratUpdateAddresss(address, setShowModal));
  };

  return {
    auth,
    loginUser,
    registerUser,
    resetEmailApi,
    logoutAuth,
    updateUser,
    createAddress,
    deleteAddress,
    updateAddress,
  };
};
