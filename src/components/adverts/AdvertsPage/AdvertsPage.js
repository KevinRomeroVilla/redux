import { useEffect, useState } from "react";

import FiltersForm from "./FiltersForm";
import AdvertsList from "./AdvertsList";
import EmptyList from "./EmptyList";
import storage from "../../../utils/storage";
import { defaultFilters, filterAdverts } from "./filters";
import { connect, useSelector } from "react-redux";
import { advertsLoad } from "../../../store/Action_Creators/actions";
import { getAllAdverts, getUi } from "../../../store/selectors";

const getFilters = () => storage.get("filters") || defaultFilters;
const saveFilters = (filters) => storage.set("filters", filters);

function AdvertsPage({ onAdvertsLoaded, adverts, ...props }) {
  const [filters, setFilters] = useState(getFilters);

  const { isLoading } = useSelector(getUi);

  useEffect(() => {
    saveFilters(filters);
    onAdvertsLoaded();
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
  onAdvertsLoaded: () => dispatch(advertsLoad()),
});

const connectedAdvertsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertsPage);

export default connectedAdvertsPage;
