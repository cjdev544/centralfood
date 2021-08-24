import { useRouter } from "next/router";
import { useData } from "../../hooks/useData";
import MenuBar from "./MenuBar";
import MenuRestaurants from "./MenuRestaurants";
import OptionsMenu from "./OptionsMenu";
import TopBar from "./TopBar";

const Header = () => {
  const router = useRouter();
  const path = router.query.restaurant;

  const { data } = useData();

  const plates = data?.plates?.filter((plate) => plate.restaurant === path)[0];

  return (
    <>
      <div className="header">
        <TopBar />
      </div>
      <MenuBar />
      <MenuRestaurants plates={plates?.restaurant} />
      {plates?.restaurant && <OptionsMenu plates={plates} />}
    </>
  );
};

export default Header;
