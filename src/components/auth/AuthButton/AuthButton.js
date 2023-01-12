import { Link } from "react-router-dom";
import T from "prop-types";

import { ConfirmationButton } from "../../common";
import { logout } from "../service";
import useMutation from "../../../hooks/useMutation";
import { useDispatch, useSelector } from "react-redux";
import { getIsLogged } from "../../../store/selectors";
import { authlogout } from "../../../store/Action_Creators/actions";

const AuthButton = () => {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();
  const mutation = useMutation(logout);

  const handleLogoutConfirm = async () => {
    await mutation.execute();
    dispatch(authlogout());
  };

  return isLogged ? (
    <ConfirmationButton
      confirmation='Are you sure?'
      onConfirm={handleLogoutConfirm}
    >
      Logout
    </ConfirmationButton>
  ) : (
    <Link to='/login'>Login</Link>
  );
};

//con esta parte me sale un warning sobre que la variable "handlelogout" es undefined, esto debido a que esta marado como "isRequired", deje esta parte sin resolver porque necesitaba seguir avanzando, si para el momento de la practica no lo corrijo me gustaria que en las correciones mi enviara un link o algo para poder corregirlo, muchas gracias.
AuthButton.propTypes = {
  authlogout: T.func.isRequired,
  isLogged: T.bool,
};

AuthButton.defaultProps = {
  isLogged: false,
};

export default AuthButton;
