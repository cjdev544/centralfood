import { useEffect } from "react";
import { useRouter } from "next/router";
import RestPage from "../components/RestPage";
import { useData } from "../hooks/useData";
import BasicLayout from "../layouts/BasicLayout";

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
    <BasicLayout>
      {plates ? <RestPage plates={plates} path={path} /> : <p>Cargando...</p>}
    </BasicLayout>
  );
};

export default RestaurantPage;
