import { ADVERTS_LOADED_SUCCESS } from "../types/types";
import { advertsLoadedSuccess } from "./actions";

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
