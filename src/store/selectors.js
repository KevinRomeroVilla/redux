export const getIsLogged = (state) => state.auth;

export const getAllAdverts = (state) => state.adverts;

export const getAdvertdetail = (state, advertId) =>
  getAllAdverts(state).find((advert) => advert.id.toString() === advertId);
