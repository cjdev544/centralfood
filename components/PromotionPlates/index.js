import SectionPlates from "../SectionPlates";

const PromotionPlates = ({ data }) => {
  const { promotionPlates } = data;

  return (
    <section className="promotion-plates">
      <h2 className="promotion-plates__title">{promotionPlates?.promoTitle}</h2>
      <div className="promotion-plates__text">
        <p>{promotionPlates?.description}</p>
      </div>
      <SectionPlates plates={promotionPlates?.plates} />
    </section>
  );
};

export default PromotionPlates;
