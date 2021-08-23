import { types } from "../types";

const initialState = null;

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getPromotionPlates:
      return {
        ...state,
        promotionPlates: action.payload,
      };

    case types.getPopularPlates:
      return {
        ...state,
        popularPlates: action.payload,
      };

    case types.getRestaurants:
      return {
        ...state,
        restaurants: action.payload,
      };

    case types.getPlates:
      return {
        ...state,
        plates: action.payload,
      };

    case types.getHomePage:
      return {
        ...state,
        homePage: action.payload,
      };

    case types.addPlate:
      return {
        ...state,
        plates: [...state.plates, action.payload],
      };

    case types.updatePlate:
      return {
        ...state,
        plates: [
          ...state.plates.filter((plate) => plate.id !== action.payload.id),
          action.payload,
        ],
      };

    default:
      return state;
  }
};
