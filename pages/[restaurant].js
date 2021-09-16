import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RestPage from "../components/RestPage";
import { useData } from "../hooks/useData";
import DefaultLoader from "../components/DefaultLoader";
import Seo from "../components/Seo";

const RestaurantPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const path = router.query.restaurant;

  const { data, getRestaurantPlates } = useData();

  useEffect(() => {
    const platesExist = data?.plates?.filter(
      (plate) => plate.restaurant === path
    );
    if (platesExist?.length === 0) {
      getRestaurantPlates(path);
    }
  }, [path]);

  useEffect(() => {
    const restaurant = {
      sushiguay: "Sushi Guay",
      guaywok: "Guay Wok",
      "sabor-casita": "Con Sabor a Casita",
      tapas: "Tapas",
      bebidas: "Bebidas",
    };
    const desc = {
      sushiguay:
        "Sushi Guay, restaurante de comida japonesa, sushi, maki, temaki, rolls tempura, rolls semitempura, ensaladas y platos combinados.",
      guaywok:
        "Guay Wok, restaourante de comida china, arroz, lumpia, pollo agridulce, chopsuey y platos combinados.",
      "sabor-casita":
        "Con Sabor a Casita, restaurante de comida latína, empanadas ,arepas, tostones playeros, cachapas, camperos y pabellon.",
      tapas:
        "Tapas, disfrutas de nuestras tapas como entrada para tu comida favorita.",
      bebidas:
        "Bebidas, acompaña tu comida con la variedad de vevidas que tenemos para ti.",
    };
    setTitle(restaurant[path] || "Central Food");
    setDescription(
      desc[path] || "Central Food, porque en la variedad esta el gusto."
    );
  }, [path]);

  const plates = data?.plates?.filter((plate) => plate.restaurant === path)[0];
  return (
    <>
      <Seo title={title} description={description} />
      {plates ? <RestPage plates={plates} path={path} /> : <DefaultLoader />}
    </>
  );
};

export default RestaurantPage;
