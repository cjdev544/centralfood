import { useDispatch, useSelector } from "react-redux";
import { BASE_PATH } from "../helpers/constants";
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

  const loginUser = (identifier, password, setShowModal, subscribe) => {
    dispatch(loginApi(identifier, password, setShowModal, subscribe));
  };

  const registerUser = (formData, setShowModal, subscribe) => {
    dispatch(registerApi(formData, setShowModal, subscribe));
  };

  const resetPasswordApi = async (email) => {
    try {
      const url = `${BASE_PATH}/auth/forgot-password`;
      const params = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      };

      const response = await fetch(url, params);
      // const result = await response.json();
      console.log("Correo enviado");
    } catch (err) {
      console.error("A ocurrido un error", err.message);
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
    resetPasswordApi,
    logoutAuth,
    updateUser,
    createAddress,
    deleteAddress,
    updateAddress,
  };
};
