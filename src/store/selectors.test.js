import { getAdvertdetail } from "./selectors";

describe("getAdvertDetail", () => {
  test("should return a adverts by advertId", () => {
    const advertId = "1";
    const adverts = [{ id: advertId }];
    const state = { adverts: { data: adverts } };
    expect(getAdvertdetail(advertId)(state)).toBe(adverts[0]);
  });
  test("should not return any advert", () => {
    const advertId = "1";
    const adverts = [];
    const state = { adverts: { data: adverts } };
    expect(getAdvertdetail(advertId)(state)).toBe(undefined);
  });
});
