import { ADVERTS_LOADED_SUCCESS } from "../types/types";
import {
  advertsLoadedSuccess,
  authLogin,
  authLoginFailure,
  authLoginRequest,
  authLoginSuccess,
} from "./actions";

describe("advertsLoadedSuccess", () => {
  test('Should return a "ADVERTS_LOADED_SUCCESS" action', () => {
    const adverts = "adverts";
    const expectedAction = {
      type: ADVERTS_LOADED_SUCCESS,
      payload: adverts,
    };
    const action = advertsLoadedSuccess(adverts);
    expect(action).toEqual(expectedAction);
  });
});

describe("authLogin", () => {
  const credentials = "credential";
  const action = authLogin(credentials);
  const dispatch = jest.fn();
  const api = { auth: {} };
  const router = { navigate: jest.fn(), state: { location: {} } };

  describe("when login api resolves", () => {
    test("should follow the login flow", async () => {
      api.auth.login = jest.fn().mockResolvedValue();
      await action(dispatch, undefined, { api, router });
      expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
      expect(api.auth.login).toHaveBeenCalledWith(credentials);
      expect(dispatch).toHaveBeenNthCalledWith(2, authLoginSuccess());
      expect(router.navigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });

  describe("When login api rejects", () => {
    const error = "error";
    test("should follow the error flow", async () => {
      api.auth.login = jest.fn().mockRejectedValue(error);
      await action(dispatch, undefined, { api });
      expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
      expect(api.auth.login).toHaveBeenCalledWith(credentials);
      expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFailure(error));
    });
  });
});
