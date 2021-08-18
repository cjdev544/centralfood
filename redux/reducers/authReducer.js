import { types } from "../types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      if (!action.payload.jwt) {
        return {};
      }
      return {
        ...state,
        uid: action.payload.uid,
        jwt: action.payload.jwt,
      };

    case types.logout:
      return {};

    case types.setUser:
      return {
        ...state,
        user: action.payload,
      };

    case types.userDirection:
      return {
        ...state,
        directions: [...state.directions, action.payload],
      };

    case types.directions:
      return {
        ...state,
        directions: action.payload,
      };

    case types.deleteDirection:
      return {
        ...state,
        directions: state?.directions?.filter(
          (address) => address.id !== action.payload
        ),
      };

    case types.updateDirection:
      console.log(action.payload);
      return {
        ...state,
        directions: [
          ...state.directions.filter(
            (address) => address.id !== action.payload.id
          ),
          action.payload,
        ],
      };

    default:
      return state;
  }
};
