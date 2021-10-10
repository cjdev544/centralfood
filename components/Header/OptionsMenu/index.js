import { Container } from "semantic-ui-react";
import { Link, animateScroll as scroll } from "react-scroll";
import style from "./OptionsMenu.module.css";

const OptionsMenu = ({ plates }) => {
  return (
    <div className={style.optionsMenu}>
      <Container className="options-menu__container">
        {plates?.plates.map((optionPlates) => (
          <div
            className={style.optionsMenu__button}
            key={optionPlates.category}
          >
            <Link
              activeClass={style.active}
              to={optionPlates.category}
              spy={true}
              smooth={true}
              offset={-250}
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
