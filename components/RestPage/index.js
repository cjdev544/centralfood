import DefaultLoader from "../DefaultLoader";
import SectionPlates from "../SectionPlates";
import style from './RestPage.module.css'

const RestPage = ({ plates, path }) => {
  const pageRest = {
    sushiguay: "Sushi Guay",
    guaywok: "Guay Wok",
    "sabor-casita": "Con Sabor a Casita",
    tapas: "Tapas",
    bebidas: "Bebidas",
  };

  const restaurant = pageRest[path];

  if (!plates) return <DefaultLoader />;

  return (
    <div className="rest-page">
      <h2 className={style.title}>{restaurant}</h2>
      {plates?.plates?.map((plate) => (
        <section
          className="rest-page__option"
          key={plate.category}
          id={plate.category}
        >
          <h3 className={style.optionTitle}>{plate.category}</h3>
          <SectionPlates plates={plate.plates} />
        </section>
      ))}
    </div>
  );
};

export default RestPage;
