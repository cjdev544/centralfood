import { types } from "../types";
import { BASE_PATH } from "../../helpers/constats";
import { toast } from "react-toastify";
import { uiIsLoading, uiShowModal } from "./ui";
import { setToken } from "../../helpers/token";
import { authFetch } from "../../helpers/fetch";

export const registerApi = (formData) => {
  const url = `${BASE_PATH}/auth/local/register`;
  const params = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  return (dispatch) => {
    fetch(url, params)
      .then(() => dispatch(loginApi(formData.email, formData.password)))
      .catch((err) => {
        console.error(err);
        toast.error("Error al registrar usuario");
        dispatch(loginApi(null, null));
      });
  };
};

export const loginApi = (identifier, password) => {
  const url = `${BASE_PATH}/auth/local`;
  const params = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ identifier, password }),
  };

  return (dispatch) => {
    fetch(url, params)
      .then((response) => {
        response
          .json()
          .then((result) => {
            setToken(result.jwt);
            dispatch(authUser({ uid: result.user._id, jwt: result.jwt }));

            if (!result?.jwt) toast.error("Usuario o contraseña incorrecta");
          })
          .catch(() => toast.error("Error al iniciar sesión"));
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error al iniciar sesión");
      })
      .finally(() => {
        dispatch(uiIsLoading(false));
        dispatch(uiShowModal(false));
      });
  };
};

export const authUser = (user) => ({
  type: types.login,
  payload: user,
});

export const logoutUser = () => ({
  type: types.logout,
});

export const getUser = (logout) => {
  return async (dispatch) => {
    try {
      const url = `${BASE_PATH}/users/me`;
      const user = await authFetch(url, null, logout);
      const res = user ? user : null;
      dispatch(setUser(res));
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

const setUser = (user) => ({
  type: types.setUser,
  payload: user,
});
