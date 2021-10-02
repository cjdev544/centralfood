import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useData } from "../../hooks/useData";
import { useMediaQueryJs } from "../../hooks/useMediaQueryJs";
import MenuBar from "./MenuBar";
import MenuRestaurants from "./MenuRestaurants";
import OptionsMenu from "./OptionsMenu";
import TopBar from "./TopBar";
import style from "./Header.module.css";
import OrderAlert from "../OrderAlert";

const Header = ({ ordersAlert }) => {
  const [showMenuRestaurant, setShowMenuRestaurant] = useState(true);

  const router = useRouter();
  const path = router.query.restaurant;
  const pathname = router.pathname;

  const { isAMobil } = useMediaQueryJs();
  const { data } = useData();

  const plates = data?.plates?.filter((plate) => plate.restaurant === path)[0];

  useEffect(() => {
    if (
      pathname.includes("/plato/") ||
      pathname.includes("/carrito") ||
      pathname.includes("/cuenta")
    ) {
      setShowMenuRestaurant(false);
    } else {
      setShowMenuRestaurant(true);
    }
  }, [pathname]);

  return (
    <>
      <div className={style.header}>
        <TopBar />
      </div>
      <div className={style.header__fix}>
        <MenuBar />
        {showMenuRestaurant && <MenuRestaurants />}
        {plates?.restaurant && !isAMobil && <OptionsMenu plates={plates} />}
        {ordersAlert?.length > 0 &&
          ordersAlert?.map((order) => (
            <OrderAlert key={order.id} order={order} />
          ))}
      </div>
    </>
  );
};

export default Header;
