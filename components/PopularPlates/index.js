import SectionPlates from "../SectionPlates";

const PopularePlates = ({ data }) => {
  const { popularPlates } = data;

  return (
    <section className="popular-plates">
      <h2 className="popular-plates__title">{popularPlates?.popularTitle}</h2>
      <div className="popular-plates__text">
        <p>{popularPlates?.description}</p>
      </div>
      <SectionPlates plates={popularPlates?.plates} />
    </section>
  );
};

export default PopularePlates;
