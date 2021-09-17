import SectionPlates from "../SectionPlates";
import style from './PopularPlates.module.css'

const PopularePlates = ({ data }) => {
  const { popularPlates } = data;

  return (
    <section className={style.popular}>
      <h2 className={style.title}>{popularPlates?.popularTitle}</h2>
      <div className={style.text}>
        <p>{popularPlates?.description}</p>
      </div>
      <SectionPlates plates={popularPlates?.plates} />
    </section>
  );
};

export default PopularePlates;
