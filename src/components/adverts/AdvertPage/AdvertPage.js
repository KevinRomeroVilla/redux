import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AdvertDetail from "./AdvertDetail";
import { deleteAdvert } from "../service";
import useMutation from "../../../hooks/useMutation";
import { useDispatch, useSelector } from "react-redux";
import { getAdvertdetail, getUi } from "../../../store/selectors";
import { advertLoad } from "../../../store/Action_Creators/actions";

function AdvertPage() {
  const { advertId } = useParams();
  const navigate = useNavigate();
  const { isLoading } = useSelector(getUi);
  const mutation = useMutation(deleteAdvert);
  const advert = useSelector(getAdvertdetail(advertId));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(advertLoad(advertId)).catch((error) => {
      if (error.status === 404) {
        navigate("404");
      }
    });
  }, [dispatch, advertId, navigate]);

  const handleDelete = () => {
    mutation.execute(advertId).then(() => navigate("/"));
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
