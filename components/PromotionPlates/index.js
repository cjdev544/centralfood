import SectionPlates from "../SectionPlates";
import style from './PromotionPlates.module.css'

const PromotionPlates = ({ data }) => {
  const { promotionPlates } = data;

  return (
    <section className={style.promotion}>
      <h2 className={style.title}>{promotionPlates?.promoTitle}</h2>
      <div className={style.text}>
        <p>{promotionPlates?.description}</p>
      </div>
      <SectionPlates plates={promotionPlates?.plates} />
    </section>
  );
};

export default PromotionPlates;
