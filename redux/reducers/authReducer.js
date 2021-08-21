import { types } from "../types";

const initialState = {
  auth: {},
  user: {},
  jwt: "",
  uid: "",
  addresses: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login:
      if (!action.payload.jwt) {
        return initialState;
      }
      return {
        ...state,
        uid: action.payload.uid,
        jwt: action.payload.jwt,
      };

    case types.logout:
      return initialState;

    case types.setUser:
      return {
        ...state,
        user: action.payload,
      };

    case types.updateUser:
      return {
        ...state,
        user: action.payload,
      };

    case types.getAddress:
      return {
        ...state,
        addresses: action.payload,
      };

    case types.createAddress:
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
      };

    case types.deleteAddress:
      console.log(action.payload);
      console.log(state.addresses);
      return {
        ...state,
        addresses: state.addresses.filter(
          (address) => address.id !== action.payload
        ),
      };

    case types.updateAddress:
      return {
        ...state,
        address: [
          ...state.addresses.filter(
            (address) => address.id !== action.payload.id
          ),
          action.payload,
        ],
      };

    default:
      return state;
  }
};
