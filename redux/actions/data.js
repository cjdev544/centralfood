import { concatArray } from "../../helpers/concatArray";
import { BASE_PATH } from "../../helpers/constats";
import { types } from "../types";

export const startGetData = () => {
  return async (dispatch) => {
    try {
      const url = `${BASE_PATH}/pagina-promocions`;
      const response = await fetch(url);
      const result = await response.json();
      const res = result[0];
      const promotionPlates = concatArray(res);
      const promoSection = {
        promoTitle: res.titulo_promocion,
        description: res.descripcion_promocion,
        plates: promotionPlates,
      };
      dispatch(getPromotionPlates(promoSection));
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

const getPromotionPlates = (data) => ({
  type: types.getPromotionPlates,
  payload: data,
});
