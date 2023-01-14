import client from "../../api/client";

const advertsPath = "/v1/adverts";

export const getTags = () => {
  return client.get(`${advertsPath}/tags`);
};
