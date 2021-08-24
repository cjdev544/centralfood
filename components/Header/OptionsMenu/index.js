import { Container } from "semantic-ui-react";
import { Link, animateScroll as scroll } from "react-scroll";

const OptionsMenu = ({ plates }) => {
  return (
    <div className="options-menu">
      <Container className="options-menu__container">
        {plates?.plates.map((optionPlates) => (
          <div className="options-menu__button" key={optionPlates.category}>
            <Link
              activeClass="active"
              to={optionPlates.category}
              spy={true}
              smooth={true}
              offset={-180}
              duration={500}
            >
              {optionPlates.category}
            </Link>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default OptionsMenu;
