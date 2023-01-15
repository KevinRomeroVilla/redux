import { useEffect } from "react";
import { useParams } from "react-router-dom";

import AdvertDetail from "./AdvertDetail";
import { deleteAdvert } from "../service";
import useMutation from "../../../hooks/useMutation";
import { useDispatch, useSelector } from "react-redux";
import { getAdvertdetail, getUi } from "../../../store/selectors";
import {
  advertDelete,
  advertLoad,
} from "../../../store/Action_Creators/actions";

function AdvertPage() {
  const { advertId } = useParams();
  const { isLoading } = useSelector(getUi);
  const mutation = useMutation(deleteAdvert);
  const advert = useSelector(getAdvertdetail(advertId));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(advertLoad(advertId));
  }, [dispatch, advertId]);

  const handleDelete = () => {
    dispatch(advertDelete(advertId));
  };

  if (isLoading) {
    return "Loading...";
  }

  return (
    advert && (
      <AdvertDetail
        onDelete={handleDelete}
        isLoading={mutation.isLoading}
        {...advert}
      />
    )
  );
}

export default AdvertPage;
