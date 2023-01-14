import React from "react";

import { createAdvert } from "../service";
import NewAdvertForm from "./NewAdvertForm";
import useMutation from "../../../hooks/useMutation";
import { useDispatch } from "react-redux";
import { advertCreated } from "../../../store/Action_Creators/actions";

function NewAdvertPage() {
  const dispatch = useDispatch();
  const { isLoading } = useMutation(createAdvert);

  const handleSubmit = (newAdvert) => {
    dispatch(advertCreated(newAdvert));
  };

  return <NewAdvertForm onSubmit={handleSubmit} isLoading={isLoading} />;
}

export default NewAdvertPage;
