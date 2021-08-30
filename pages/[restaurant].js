import { useEffect } from "react";
import { useRouter } from "next/router";
import RestPage from "../components/RestPage";
import { useData } from "../hooks/useData";
import DefaultLoader from "../components/DefaultLoader";

const RestaurantPage = () => {
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

  const plates = data?.plates?.filter((plate) => plate.restaurant === path)[0];
  return (
    <>{plates ? <RestPage plates={plates} path={path} /> : <DefaultLoader />}</>
  );
};

export default RestaurantPage;
