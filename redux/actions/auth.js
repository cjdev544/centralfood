import { types } from "../types";
import { BASE_PATH } from "../../helpers/constants";
import { toast } from "react-toastify";
import { uiIsLoading } from "./ui";
import { setToken } from "../../helpers/token";
import { authFetch } from "../../helpers/fetch";
import { suscribeEmail } from "../../helpers/suscribeEmail";

export const registerApi = (formData, setShowModal, subscribe) => {
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
      .then(() =>
        dispatch(
          loginApi(formData.email, formData.password, setShowModal, subscribe)
        )
      )
      .catch((err) => {
        console.error(err);
        toast.error("Error al registrar usuario");
        dispatch(loginApi(null, null, setShowModal));
      });
  };
};

export const loginApi = (identifier, password, setShowModal, subscribe) => {
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
            dispatch(getUser(() => null));
            if (!result?.jwt) {
              toast.error("Usuario o contraseña incorrecta");
            } else {
              dispatch(getApiAddress());

              // Call suscribe email marketing api
              if (subscribe) suscribeEmail(identifier);
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Error al iniciar sesión");
          });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error al iniciar sesión");
      })
      .finally(() => {
        dispatch(uiIsLoading(false));
        setShowModal(false);
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

export const startUpdateUser = (uid, data) => {
  return async (dispatch) => {
    try {
      const url = `${BASE_PATH}/users/${uid}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const res = await authFetch(url, params, () => null);

      if (res.statusCode !== 400) {
        dispatch(setUser(res));
        dispatch(uiIsLoading(false));
        toast.success("Usuario actualizado");
      } else {
        if (res.message[0].messages[0].message === "Email already taken") {
          toast.error(
            "Este correo ya se encuentra registrado con otro usuario"
          );
        } else {
          toast.error("Error al actualizar usuario");
        }
        dispatch(uiIsLoading(false));
      }
    } catch (err) {
      console.log(err);
      dispatch(uiIsLoading(false));
      toast.error("Error al actualizar usuario");
      return null;
    }
  };
};

export const setUser = (user) => ({
  type: types.setUser,
  payload: user,
});

export const getApiAddress = (userId) => {
  return async (dispatch) => {
    try {
      const url = `${BASE_PATH}/addresses?user=${userId}`;
      if (userId) {
        const addresses = await authFetch(url, null, () => null);
        dispatch(getAddress(addresses));
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

export const registerAddress = (data, setShowModal) => {
  return async (dispatch) => {
    try {
      const url = `${BASE_PATH}/addresses`;
      const params = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const address = await authFetch(url, params, () => null);
      dispatch(setAddress(address));
      dispatch(uiIsLoading(false));
      setShowModal(false);
      toast.success("Dirección creada");
    } catch (err) {
      console.log(err);
      dispatch(uiIsLoading(false));
      toast.error("Error en el servidor. Intente de nuevo");
      return null;
    }
  };
};

export const removeAddress = (addressId) => {
  return async (dispatch) => {
    try {
      const url = `${BASE_PATH}/addresses/${addressId}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      };
      await authFetch(url, params, () => null);
      dispatch(deleteAddress(addressId));
      dispatch(uiIsLoading(false));
      toast.success("Dirección eliminada");
    } catch (err) {
      console.log(err);
      dispatch(uiIsLoading(false));
      toast.error("Error en el servidor. Intente de nuevo");
      return null;
    }
  };
};

export const stratUpdateAddresss = (address, setShowModal) => {
  return async (dispatch) => {
    try {
      const url = `${BASE_PATH}/addresses/${address.id}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(address),
      };
      const res = await authFetch(url, params, () => null);
      dispatch(uiIsLoading(false));
      dispatch(updateAddress(res));
      dispatch(getApiAddress(address.user.id));
      setShowModal(false);
      toast.success("Dirección actualizada");
    } catch (err) {
      console.log(err);
      dispatch(uiIsLoading(false));
      toast.error("Error en el servidor. Intente de nuevo");
      return null;
    }
  };
};

const setAddress = (address) => ({
  type: types.createAddress,
  payload: address,
});

const getAddress = (addresses) => ({
  type: types.getAddress,
  payload: addresses,
});

const deleteAddress = (addressId) => ({
  type: types.deleteAddress,
  payload: addressId,
});

const updateAddress = (address) => ({
  type: types.updateAddress,
  payload: address,
});
