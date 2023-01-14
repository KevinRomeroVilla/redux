export const getIsLogged = (state) => state.auth;

export const getAllAdverts = (state) => state.adverts.data;

export const areAdvertsLoaded = (state) => state.adverts.areLoaded;

// export const getAdvertdetail = (state, advertId) =>
//   getAllAdverts(state).find((advert) => advert.id.toString() === advertId);

export const getAdvertdetail = (advertId) => (state) =>
  getAllAdverts(state).find((advert) => advert.id.toString() === advertId);

export const getUi = (state) => state.ui;

export const tagsDone = (state) => state.tags.tagsLoaded;

export const getTags = (state) => state.tags;
