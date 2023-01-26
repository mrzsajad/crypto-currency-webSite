import { loading, success, failed } from "../constatnts";
export const coins = (
  state = { data: [], loading: false, error: "" },
  { type, payload }
) => {
  switch (type) {
    case loading:
      return payload;
    case success:
      return payload;
    case failed:
      return payload;

    default:
      return state;
  }
};

export const search = (state = "", { type, payload }) => {
  switch (type) {
    case "search":
      return payload;

    default:
      return state;
  }
};
