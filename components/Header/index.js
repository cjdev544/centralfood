// import { useRouter } from "next/router";
import MenuBar from "./MenuBar";
import MenuRestaurants from "./MenuRestaurants";
// import OptionsMenu from "./OptionsMenu";
import TopBar from "./TopBar";

const Header = () => {
  // const { route } = useRouter();

  return (
    <div className="header">
      <TopBar />
      <MenuBar />
      <MenuRestaurants />
      {/* {route !== "/" && <OptionsMenu />} */}
    </div>
  );
};

export default Header;
