import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { defaultState } from "../../../store/Reducers/reducers";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
  test("Snapshot", () => {
    const store = {
      getState: () => defaultState,
      dispatch: () => {},
      subscribe: () => {},
    };
    const { container } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
