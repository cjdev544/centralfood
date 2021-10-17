import { types } from "../types";

const initialState = {
  promotionPlates: null,
  popularPlates: null,
  restaurants: [],
  plates: [],
  allPlates: null,
  deliveryPrice: null,
  isOpen: null,
};

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
        plates: [
          ...state.plates.filter(
            (plate) => plate.restaurant !== action.payload.restaurant
          ),
          action.payload,
        ],
      };

    case types.getAllPlates:
      return {
        ...state,
        allPlates: action.payload,
      };

    case types.getPriceDelivery6km:
      return {
        ...state,
        deliveryPrice: action.payload,
      };

    case types.isOpenLocal:
      return {
        ...state,
        isOpen: action.payload,
      };

    default:
      return state;
  }
};
