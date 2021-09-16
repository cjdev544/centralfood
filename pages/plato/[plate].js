import { useRouter } from "next/router";
import DefaultLoader from "../../components/DefaultLoader";
import Plate from "../../components/Plate";
import { useData } from "../../hooks/useData";
import Seo from "../../components/Seo";

const PlatePage = () => {
  const { query } = useRouter();
  const { data } = useData();

  const plate = data?.allPlates?.filter(
    (plate) => plate.path === query.plate
  )[0];

  if (!plate) return <DefaultLoader />;
  console.log(plate);
  return (
    <>
      <Seo title={plate?.nombre} description={plate?.descripcion} />
      <Plate plate={plate} />
    </>
  );
};

export default PlatePage;
