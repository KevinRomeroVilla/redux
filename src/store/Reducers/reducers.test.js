import {
  authLoginSuccess,
  authLogoutSuccess,
} from "../Action_Creators/actions";
import { auth, defaultState } from "./reducers";

describe("auth", () => {
  test('should manage "AUTH_LOGIN_SUCCESS" action', () => {
    const state = defaultState.auth;
    const action = authLoginSuccess();
    const result = auth(state, action);
    expect(result).toBe(true);
  });
  test('should manage "AUTH_LOGOUT" action', () => {
    const state = defaultState.auth;
    const action = authLogoutSuccess();
    const result = auth(state, action);
    expect(result).toBe(false);
  });
  test("should manage any action", () => {
    const state = undefined;
    const action = { type: "ANY" };
    const result = auth(state, action);
    expect(result).toBe(defaultState.auth);
  });
});
