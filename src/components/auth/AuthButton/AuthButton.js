import { Link } from "react-router-dom";
import T from "prop-types";

import { ConfirmationButton } from "../../common";
import { logout } from "../service";
import useMutation from "../../../hooks/useMutation";
import { useSelector } from "react-redux";
import { getIsLogged } from "../../../store/selectors";

const AuthButton = ({ handleLogout }) => {
  const isLogged = useSelector(getIsLogged);
  const mutation = useMutation(logout);

  const handleLogoutConfirm = async () => {
    await mutation.execute();
    handleLogout();
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

AuthButton.propTypes = {
  handleLogout: T.func.isRequired,
  isLogged: T.bool,
};

AuthButton.defaultProps = {
  isLogged: false,
};

export default AuthButton;
