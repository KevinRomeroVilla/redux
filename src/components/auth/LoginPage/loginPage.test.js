import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { authLogin } from "../../../store/Action_Creators/actions";
import { defaultState } from "../../../store/Reducers/reducers";
import LoginPage from "./LoginPage";

jest.mock("../../../store/Action_Creators/actions");

describe("LoginPage", () => {
  const store = {
    getState: () => defaultState,
    dispatch: () => {},
    subscribe: () => {},
  };

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

  test("Snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test("Should dispatch authLogin action", () => {
    const username = "david";
    const password = "1234";

    renderComponent();
    const usernameInput = screen.getByPlaceholderText(/email/);
    const userPasswordInput = screen.getByPlaceholderText(/password/);
    const submitButton = screen.getByRole("button");

    expect(submitButton).toBeDisabled;
    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(userPasswordInput, { target: { value: password } });
    expect(submitButton).toBeEnabled;
    fireEvent.click(submitButton);
    expect(authLogin).toHaveBeenCalled();
  });
});
