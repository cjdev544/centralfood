import { Loader } from "semantic-ui-react";
import { useSearch } from "../../hooks/useSearch";
import SectionPlates from "../SectionPlates";

const Search = () => {
  const { searchPlates } = useSearch();

  return (
    <div className="search">
      {!searchPlates && <Loader active>Buscando platos</Loader>}
      {searchPlates?.length === 0 && (
        <div className="search__no-found">
          <h2>No hay coincidencias con la busqueda</h2>
        </div>
      )}
      {searchPlates?.length > 0 && (
        <>
          <h2 className="search__title">Resultados de busqueda</h2>
          <SectionPlates plates={searchPlates} />
        </>
      )}
    </div>
  );
};

export default Search;
