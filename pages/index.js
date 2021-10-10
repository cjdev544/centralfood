import DefaultLoader from "../components/DefaultLoader";
import Autocomplete from "../components/Autocomplete";
import PopularePlates from "../components/PopularPlates";
import PromotionPlates from "../components/PromotionPlates";
import Seo from "../components/Seo";
import { useData } from "../hooks/useData";
import PlacesAutocompleteGoogle from "../components/PlacesAutocompleteGoogle";

export default function Home() {
  const { data } = useData();

  if (!data) return <DefaultLoader />;

  return (
    <>
      <Seo title="Inicio" />
      <main>
        {/* <AutocompletePlace /> */}
        {/* <PlacesAutocomplete /> */}
        {/* <Autocomplete /> */}
        {/* <PlacesAutocompleteGoogle /> */}
        {data?.promotionPlates && <PromotionPlates data={data} />}
        {data?.popularPlates && <PopularePlates data={data} />}
      </main>
    </>
  );
}
