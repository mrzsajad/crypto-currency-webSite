import axios from "axios";
import { loading, success, failed } from "../constatnts";

export const getData = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: loading,
      payload: { data: [], loading: true, error: "" },
    });
    const { data } = await axios(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    dispatch({
      type: success,
      payload: { data: [...data], loading: false, error: "" },
    });
  } catch (error) {
    dispatch({
      type: failed,
      payload: { data: [], loading: false, error:error.message },
    });
  }
};
