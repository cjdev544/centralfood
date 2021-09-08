import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useData } from "../../hooks/useData";
import { useMediaQueryJs } from "../../hooks/useMediaQueryJs";
import MenuBar from "./MenuBar";
import MenuRestaurants from "./MenuRestaurants";
import OptionsMenu from "./OptionsMenu";
import TopBar from "./TopBar";

const Header = () => {
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
      <div className="header">
        <TopBar />
      </div>
      <div className="header__fix">
        <MenuBar />
        {showMenuRestaurant && <MenuRestaurants />}
        {plates?.restaurant && !isAMobil && <OptionsMenu plates={plates} />}
      </div>
    </>
  );
};

export default Header;
