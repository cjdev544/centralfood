import Image from "next/image";
import Link from "next/link";
import { Container, Input, Grid } from "semantic-ui-react";
import CentralFoodLogo from "../../../public/central-food.png";
import "react-toastify/dist/ReactToastify.css";

const TopBar = () => {
  return (
    <div className="top-bar">
      <Container>
        <Grid className="top-bar">
          <div className="top-bar__left">
            <Link href="/">
              <a className="logo">
                <Image
                  src={CentralFoodLogo}
                  alt="Central Food logo"
                  width={100}
                  height={80}
                />
                <div className="logo-text">
                  <div className="logo-text__title">
                    <h1>Central Food</h1>
                    <h3>Málaga</h3>
                  </div>
                  <p>En la variedad esta el gusto</p>
                </div>
              </a>
            </Link>
          </div>
          <div className="top-bar__right">
            <Input id="search" icon={{ name: "search" }} />
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default TopBar;
