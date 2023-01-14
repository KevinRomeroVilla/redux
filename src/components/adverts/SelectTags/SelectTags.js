import React, { useEffect } from "react";

//import { getTags } from "../service";
import { CheckboxGroup } from "../../common";
import { useDispatch, useSelector } from "react-redux";
import { allTags } from "../../../store/Action_Creators/actions";
import { getTags } from "../../../store/selectors";

function SelectTags(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allTags());
  }, [dispatch]);

  const { data: tags = [] } = useSelector(getTags);

  return <CheckboxGroup options={tags} {...props} />;
}

export default SelectTags;
