import { db } from "../../firebase/firebase-config";
import { types } from "../types";

export const startGetRestaurants = () => {
  return (dispatch) => {
    const newArray = [];
    db.collection("restaurants")
      .get()
      .then((response) => {
        response?.docs?.map((rest) => {
          newArray.push({
            index: rest.data().index,
            key: rest.id,
            value: rest.id,
            text: rest.data().name,
            options: rest.data().options,
          });
        });
        // Order array for index in object
        newArray.sort((a, b) => a.index - b.index);
        dispatch(getRestaurants(newArray));
      })
      .catch((err) => console.error(err));
  };
};

export const getRestaurantsClient = () => {
  const newArray = [];
  return (dispatch) =>
    db
      .collection("restaurants")
      .get()
      .then((response) => {
        response.docs.map((doc) => {
          newArray.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        dispatch(getRestaurants(newArray));
      });
};

export const getRestaurants = (rest) => ({
  type: types.getRestaurants,
  payload: rest,
});

export const startGetPlates = () => {
  return (dispatch) => {
    const newArray = [];
    db.collection("plates")
      .get()
      .then((plates) => {
        plates?.docs?.map((response) => {
          newArray.push({
            ...response.data(),
            id: response.id,
          });
        });
        dispatch(getPlates(newArray));
      });
  };
};

export const getPlatesClient = () => {
  const newArray = [];
  return (dispatch) =>
    db
      .collection("plates")
      .get()
      .then((response) => {
        response.docs.map((doc) => {
          newArray.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        dispatch(getPlates(newArray));
      });
};

export const getPlates = (plates) => ({
  type: types.getPlates,
  payload: plates,
});

export const startGetHomePage = () => {
  return (dispatch) => {
    db.collection("homePage")
      .get()
      .then((response) => {
        const data = {
          ...response.docs[0].data(),
          id: response.docs[0].id,
        };
        dispatch(getHomePage(data));
      });
  };
};

export const getHomePage = (data) => ({
  type: types.getHomePage,
  payload: data,
});

export const addPlate = (plate) => ({
  type: types.addPlate,
  payload: plate,
});

export const updatePlate = (plate) => ({
  type: types.updatePlate,
  payload: plate,
});
