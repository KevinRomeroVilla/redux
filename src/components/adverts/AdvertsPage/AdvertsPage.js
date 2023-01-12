import { useEffect, useState } from "react";

import FiltersForm from "./FiltersForm";
import AdvertsList from "./AdvertsList";
import EmptyList from "./EmptyList";
import storage from "../../../utils/storage";
import { getAdverts } from "../service";
import { defaultFilters, filterAdverts } from "./filters";
import useQuery from "../../../hooks/useQuery";
import { connect } from "react-redux";
import { AdvertLoaded } from "../../../store/Action_Creators/actions";
import { getAllAdverts } from "../../../store/selectors";

const getFilters = () => storage.get("filters") || defaultFilters;
const saveFilters = (filters) => storage.set("filters", filters);

function AdvertsPage({ onAdvertsLoaded, adverts, ...props }) {
  const [filters, setFilters] = useState(getFilters);

  //tengo que corregir esta parte.
  const { isLoading } = useQuery(getAdverts);

  useEffect(() => {
    saveFilters(filters);
    const execute = async () => {
      const adverts = await getAdverts();
      onAdvertsLoaded(adverts);
    };
    execute();
  }, [filters, onAdvertsLoaded]);

  const filteredAdverts = filterAdverts(adverts, filters);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      {adverts.length > 0 && (
        <FiltersForm
          initialFilters={filters}
          defaultFilters={defaultFilters}
          prices={adverts.map(({ price }) => price)}
          onFilter={setFilters}
        />
      )}
      {filteredAdverts.length ? (
        <AdvertsList adverts={filteredAdverts} />
      ) : (
        <EmptyList advertsCount={adverts.length} />
      )}
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  adverts: getAllAdverts(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAdvertsLoaded: (adverts) => dispatch(AdvertLoaded(adverts)),
});

const connectedAdvertsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertsPage);

export default connectedAdvertsPage;
