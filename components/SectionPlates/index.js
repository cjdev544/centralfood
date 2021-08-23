import PlateBox from "../PlateBox";

const SectionPlates = ({ plates }) => {
  return (
    <div
      className={
        plates?.length > 2
          ? "section-plates__more-plates"
          : "section-plates__plates"
      }
    >
      {plates.map((plate) => (
        <PlateBox key={plate.id} plate={plate} />
      ))}
    </div>
  );
};

export default SectionPlates;
