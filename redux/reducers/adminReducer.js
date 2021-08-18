import { types } from "../types";

const initialState = {
  title1: "",
  title2: "",
  promotionPlates: [],
  popularPlates: [],
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getAdminHome:
      return {
        ...state,
        title: action.payload.title,
        plates: action.payload.plates,
      };

    default:
      return state;
  }
};
