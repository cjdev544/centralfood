import { useRouter } from "next/router";
import Plate from "../../components/Plate";
import { useData } from "../../hooks/useData";

const PlatePage = () => {
  const { query } = useRouter();
  const { data } = useData();

  const plate = data?.allPlates?.filter(
    (plate) => plate.path === query.plate
  )[0];

  if (!plate) return <p>Cargando...</p>;

  return <Plate plate={plate} />;
};

export default PlatePage;
